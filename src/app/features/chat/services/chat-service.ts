import { computed, inject, Service, signal } from '@angular/core';
import { ConversationStoreService } from '@core/services/conversation-store-service';
import { minutesAgo } from '@shared/minutes-ago-util';
import { MessageStatus } from '../enums/message-status-enum';
import { ChatThread } from '../models/chat-thread-model';
import { Message } from '../models/message-model';

export const MOCK_THREADS: Record<string, ChatThread> = {
  '1': {
    contactName: 'Sara Khalil',
    messages: [
      {
        id: 'a1',
        text: 'Hi, I ordered two items yesterday',
        sentAt: minutesAgo(40),
        fromMe: false,
        status: MessageStatus.Read,
      },
      {
        id: 'a2',
        text: 'Hello Sara! Let me check your order',
        sentAt: minutesAgo(38),
        fromMe: true,
        status: MessageStatus.Read,
      },
      {
        id: 'a3',
        text: 'Is the order shipped yet?',
        sentAt: minutesAgo(3),
        fromMe: false,
        status: MessageStatus.Read,
      },
    ],
  },
  '2': {
    contactName: 'Omar Haddad',
    messages: [
      {
        id: 'b1',
        text: 'Delivery on Thursday works?',
        sentAt: minutesAgo(60),
        fromMe: true,
        status: MessageStatus.Delivered,
      },
      {
        id: 'b2',
        text: 'Thanks, that works for me',
        sentAt: minutesAgo(45),
        fromMe: false,
        status: MessageStatus.Read,
      },
    ],
  },
  '3': {
    contactName: 'Lina Nasser',
    messages: [
      {
        id: 'c1',
        text: 'Can I get a discount on 10 units?',
        sentAt: minutesAgo(180),
        fromMe: false,
        status: MessageStatus.Read,
      },
    ],
  },
  '4': {
    contactName: 'Yazan Odeh',
    messages: [
      {
        id: 'd1',
        text: 'Please send the invoice',
        sentAt: minutesAgo(60 * 26),
        fromMe: false,
        status: MessageStatus.Read,
      },
      {
        id: 'd2',
        text: 'Sent, please check your email',
        sentAt: minutesAgo(60 * 25),
        fromMe: true,
        status: MessageStatus.Sent,
      },
    ],
  },
  '5': {
    contactName: 'Hala Mansour',
    messages: [
      {
        id: 'e1',
        text: 'Do you deliver to Irbid?',
        sentAt: minutesAgo(60 * 50),
        fromMe: false,
        status: MessageStatus.Read,
      },
    ],
  },
  '6': {
    contactName: 'Hala Mansour',
    messages: [
      {
        id: 'e1',
        text: 'Do you deliver to Irbid?',
        sentAt: minutesAgo(60 * 50),
        fromMe: false,
        status: MessageStatus.Read,
      },
    ],
  },
};

@Service()
export class ChatService {
  private readonly threads = signal<Record<string, ChatThread>>(MOCK_THREADS);
  private readonly storeService = inject(ConversationStoreService);

  readonly thread = computed(() => {
    const id = this.storeService.activeId();
    return id ? this.threadFor(id) : null;
  });

  open(conversationId: string) {
    this.storeService.setActive(conversationId);
    this.storeService.markAsRead(conversationId);
  }

  close() {
    this.storeService.setActive(null);
  }

  send(text: string) {
    const id = this.storeService.activeId();
    const trimmed = text.trim();
    if (!id || !trimmed) return;

    const current = this.threadFor(id);
    if (!current) return;

    const message: Message = {
      id: crypto.randomUUID(),
      text: trimmed,
      sentAt: new Date(),
      fromMe: true,
      status: MessageStatus.Sent,
    };

    this.threads.update((all) => ({
      ...all,
      [id]: { ...current, messages: [...current.messages, message] },
    }));

    this.storeService.recordSentMessage(id, trimmed, message.sentAt);
  }

  private threadFor(id: string): ChatThread | null {
    const saved = this.threads()[id];
    if (saved) return saved;

    const conversation = this.storeService.findById(id);
    return conversation ? { contactName: conversation.contactName, messages: [] } : null;
  }
}
