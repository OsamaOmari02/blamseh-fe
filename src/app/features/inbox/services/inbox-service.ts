import { Service, signal } from '@angular/core';
import { minutesAgo } from '@shared/minutes-ago-util';
import { Conversation } from '../models/conversation-model';

const MOCK_CONVERSATIONS: Conversation[] = [
  {
    id: '1',
    contactName: 'Sara Khalil',
    lastMessage: 'Is the order shipped yet?',
    lastMessageAt: minutesAgo(3),
    unreadCount: 2,
    assignedToMe: true,
  },
  {
    id: '2',
    contactName: 'Omar Haddad',
    lastMessage: 'Thanks, that works for me',
    lastMessageAt: minutesAgo(45),
    unreadCount: 0,
    assignedToMe: false,
  },
  {
    id: '3',
    contactName: 'Lina Nasser',
    lastMessage: 'Can I get a discount on 10 units?',
    lastMessageAt: minutesAgo(180),
    unreadCount: 5,
    assignedToMe: true,
  },
  {
    id: '4',
    contactName: 'Yazan Odeh',
    lastMessage: 'Please send the invoice',
    lastMessageAt: minutesAgo(60 * 26),
    unreadCount: 0,
    assignedToMe: false,
  },
  {
    id: '5',
    contactName: 'Hala Mansour',
    lastMessage: 'Do you deliver to Irbid?',
    lastMessageAt: minutesAgo(60 * 50),
    unreadCount: 1,
    assignedToMe: false,
  },
];

@Service()
export class InboxService {
  private readonly conversationsState = signal<Conversation[]>([]);
  private readonly loadingState = signal(false);

  readonly conversations = this.conversationsState.asReadonly();
  readonly loading = this.loadingState.asReadonly();

  load() {
    this.loadingState.set(true);
    setTimeout(() => {
      // simulates a network call
      this.conversationsState.set(MOCK_CONVERSATIONS);
      this.loadingState.set(false);
    }, 600);
  }
}
