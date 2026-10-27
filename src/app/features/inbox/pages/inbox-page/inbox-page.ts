import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { APP_ROUTES } from '@core/constants/app-routes';
import { SearchBar } from '@shared/components/search-bar/search-bar';
import { ConversationTile } from '../../components/conversation-tile/conversation-tile';
import { InboxFilterBar } from '../../components/inbox-filter-bar/inbox-filter-bar';
import { InboxFilter } from '../../enums/inbox-filter-enum';
import { Conversation } from '../../models/conversation-model';
import { InboxService } from '../../services/inbox-service';

@Component({
  selector: 'app-inbox-page',
  imports: [SearchBar, InboxFilterBar, ConversationTile],
  templateUrl: './inbox-page.html',
  styleUrl: './inbox-page.scss',
})
export class InboxPage implements OnInit {
  private readonly router = inject(Router);
  protected readonly service = inject(InboxService);

  protected readonly searchQuery = signal('');
  protected readonly activeFilter = signal(InboxFilter.All);

  ngOnInit() {
    this.service.load();
  }

  protected readonly visibleConversations = computed(() => {
    const query = this.searchQuery().trim().toLowerCase();
    const filter = this.activeFilter();

    return this.service
      .conversations()
      .filter((c) => this.matchesFilter(c, filter) && this.matchesQuery(c, query));
  });

  protected openChat(id: string) {
    this.router.navigate(['/', APP_ROUTES.chat, id]);
  }

  private matchesFilter(conversation: Conversation, filter: InboxFilter): boolean {
    switch (filter) {
      case InboxFilter.Unread:
        return conversation.unreadCount > 0;
      case InboxFilter.Assigned:
        return conversation.assignedToMe;
      default:
        return true;
    }
  }

  private matchesQuery(conversation: Conversation, query: string): boolean {
    return (
      !query ||
      conversation.contactName.toLowerCase().includes(query) ||
      conversation.lastMessage.toLowerCase().includes(query)
    );
  }
}
