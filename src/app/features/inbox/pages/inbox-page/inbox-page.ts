import {
  Component,
  OnInit,
  computed,
  effect,
  inject,
  input,
  linkedSignal,
  signal,
} from '@angular/core';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { Router, RouterOutlet } from '@angular/router';
import { APP_ROUTES } from '@core/constants/app-routes';
import { CurrentBusinessService } from '@core/services/current-business-service';
import { SearchBar } from '@shared/components/search-bar/search-bar';
import { Conversation } from '@shared/models/conversation-model';
import { debounceTime, distinctUntilChanged, map } from 'rxjs';
import { ConversationTile } from '../../components/conversation-tile/conversation-tile';
import { InboxFilterBar } from '../../components/inbox-filter-bar/inbox-filter-bar';
import { InboxFilter, parseInboxFilter } from '../../enums/inbox-filter-enum';
import { InboxService } from '../../services/inbox-service';

@Component({
  selector: 'app-inbox-page',
  imports: [SearchBar, InboxFilterBar, ConversationTile, RouterOutlet],
  templateUrl: './inbox-page.html',
  styleUrl: './inbox-page.scss',
})
export class InboxPage implements OnInit {
  private readonly router = inject(Router);
  private readonly currentBusiness = inject(CurrentBusinessService);
  protected readonly inboxService = inject(InboxService);

  // URL state: Angular fills these from ?q=...&filter=...
  readonly q = input<string>();
  readonly filter = input<string>();

  // what the user is typing (a draft), versus what the URL says (what is applied)
  private committedQuery = '';
  protected readonly searchText = linkedSignal<string | undefined, string>({
    source: this.q,
    computation: (urlValue, previous) => {
      const fromUrl = urlValue ?? '';
      // the URL catching up with what we just sent must not overwrite newer typing
      return previous && fromUrl === this.committedQuery ? previous.value : fromUrl;
    },
  });

  protected readonly searchQuery = computed(() => this.q() ?? '');
  protected readonly activeFilter = computed(() => parseInboxFilter(this.filter()));
  protected readonly chatOpen = signal(false);

  protected readonly visibleConversations = computed(() => {
    const query = this.searchQuery().trim().toLowerCase();
    const filter = this.activeFilter();

    return this.inboxService
      .conversations()
      .filter((c) => this.matchesFilter(c, filter) && this.matchesQuery(c, query));
  });

  constructor() {
    // wait for the user to pause typing before touching the URL
    toObservable(this.searchText)
      .pipe(
        debounceTime(300),
        map((text) => text.trim()),
        distinctUntilChanged(),
        takeUntilDestroyed(),
      )
      .subscribe((text) => this.commitSearch(text));

    // leave the previous business's chat open when the business changes
    let previousBusinessId = this.currentBusiness.selectedId();
    effect(() => {
      const businessId = this.currentBusiness.selectedId();
      if (businessId === previousBusinessId) return;

      previousBusinessId = businessId;
      this.router.navigate(['/', APP_ROUTES.inbox], { queryParamsHandling: 'preserve' });
    });
  }

  ngOnInit() {
    this.inboxService.load();
  }

  protected selectFilter(filter: InboxFilter) {
    this.updateQueryParams({ filter: filter === InboxFilter.All ? null : filter });
  }

  protected openChat(id: string) {
    this.router.navigate(['/', APP_ROUTES.inbox, id], { queryParamsHandling: 'preserve' });
  }

  protected retry() {
    this.inboxService.load();
  }

  private commitSearch(text: string) {
    this.committedQuery = text;
    if (text === (this.q() ?? '')) return; // the URL already says this
    this.updateQueryParams({ q: text || null });
  }

  private updateQueryParams(params: Record<string, string | null>) {
    this.router.navigate([], {
      queryParams: params,
      queryParamsHandling: 'merge',
      replaceUrl: true,
    });
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
