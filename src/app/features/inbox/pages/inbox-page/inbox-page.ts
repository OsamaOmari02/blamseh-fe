import { Component, OnInit, computed, effect, inject, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { APP_ROUTES } from '@core/constants/app-routes';
import { CurrentBusinessService } from '@core/services/current-business-service';
import { SearchBar } from '@shared/components/search-bar/search-bar';
import { Conversation } from '../../../../shared/models/conversation-model';
import { ConversationTile } from '../../components/conversation-tile/conversation-tile';
import { InboxFilterBar } from '../../components/inbox-filter-bar/inbox-filter-bar';
import { InboxFilter } from '../../enums/inbox-filter-enum';
import { InboxService } from '../../services/inbox-service';

@Component({
  selector: 'app-inbox-page',
  imports: [SearchBar, InboxFilterBar, ConversationTile, RouterOutlet],
  templateUrl: './inbox-page.html',
  styleUrl: './inbox-page.scss',
})
export class InboxPage implements OnInit {
  private readonly router = inject(Router);
  protected readonly inboxService = inject(InboxService);
  private readonly currentBusinessService = inject(CurrentBusinessService);

  protected readonly searchQuery = signal('');
  protected readonly activeFilter = signal(InboxFilter.All);

  protected readonly chatOpen = signal(false);

  constructor() {
    let previousBusinessId = this.currentBusinessService.selectedId();

    effect(() => {
      const businessId = this.currentBusinessService.selectedId();
      if (businessId === previousBusinessId) return;

      previousBusinessId = businessId;
      this.router.navigate(['/', APP_ROUTES.inbox]); // leave the old business's chat
    });
  }

  ngOnInit() {
    this.inboxService.load();
  }

  protected readonly visibleConversations = computed(() => {
    const query = this.searchQuery().trim().toLowerCase();
    const filter = this.activeFilter();

    return this.inboxService
      .conversations()
      .filter((c) => this.matchesFilter(c, filter) && this.matchesQuery(c, query));
  });

  protected openChat(id: string) {
    this.router.navigate(['/', APP_ROUTES.inbox, id]);
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
