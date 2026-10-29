import { inject, Service, signal } from '@angular/core';
import { ConversationStoreService } from '@core/services/conversation-store-servce';
import { minutesAgo } from '@shared/minutes-ago-util';
import { Conversation } from '../../../shared/models/conversation-model';

const MOCK_CONVERSATIONS: Conversation[] = [
  {
    id: '1',
    contactName: 'Sara Khalil',
    lastMessage: 'Is the order shipped yet?',
    lastMessageAt: minutesAgo(3),
    unreadCount: 2,
    assignedToMe: true,
    businessId: 'b1',
  },
  {
    id: '2',
    contactName: 'Omar Haddad',
    lastMessage: 'Thanks, that works for me',
    lastMessageAt: minutesAgo(45),
    unreadCount: 0,
    assignedToMe: false,
    businessId: 'b1',
  },
  {
    id: '3',
    contactName: 'Lina Nasser',
    lastMessage: 'Can I get a discount on 10 units?',
    lastMessageAt: minutesAgo(180),
    unreadCount: 5,
    assignedToMe: true,
    businessId: 'b1',
  },
  {
    id: '4',
    contactName: 'Yazan Odeh',
    lastMessage: 'Please send the invoice',
    lastMessageAt: minutesAgo(60 * 26),
    unreadCount: 0,
    assignedToMe: false,
    businessId: 'b2',
  },
  {
    id: '5',
    contactName: 'Hala Mansour',
    lastMessage: 'Do you deliver to Irbid?',
    lastMessageAt: minutesAgo(60 * 50),
    unreadCount: 1,
    assignedToMe: false,
    businessId: 'b2',
  },
];

@Service()
export class InboxService {
  private readonly storeService = inject(ConversationStoreService);
  private readonly loadingState = signal(false);
  private loaded = false;

  readonly conversations = this.storeService.conversations;
  readonly activeId = this.storeService.activeId;
  readonly loading = this.loadingState.asReadonly();

  load() {
    if (this.loaded || this.loadingState()) return;
    this.loadingState.set(true);
    setTimeout(() => {
      // simulates a network call
      this.storeService.setAll(MOCK_CONVERSATIONS);
      this.loaded = true;
      this.loadingState.set(false);
    }, 600);
  }
}
