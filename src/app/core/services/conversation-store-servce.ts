import { Service, computed, inject, signal } from '@angular/core';
import { Conversation } from '@shared/models/conversation-model';
import { CurrentBusinessService } from './current-business-service';

@Service()
export class ConversationStoreService {
  private readonly ConversationsState = signal<Conversation[]>([]);
  private readonly activeIdState = signal<string | null>(null);

  private readonly currentBusinessService = inject(CurrentBusinessService);

  // newest activity first, like WhatsApp
  readonly conversations = computed(() =>
    this.ConversationsState()
      .filter((c) => c.businessId === this.currentBusinessService.selectedId())
      .sort((a, b) => b.lastMessageAt.getTime() - a.lastMessageAt.getTime()),
  );
  readonly activeId = this.activeIdState.asReadonly();

  setAll(conversations: Conversation[]) {
    const activeId = this.activeIdState();
    // if a chat was opened before the list finished loading, it starts out read
    this.ConversationsState.set(
      conversations.map((c) => (c.id === activeId ? { ...c, unreadCount: 0 } : c)),
    );
  }

  setActive(id: string | null) {
    this.activeIdState.set(id);
  }

  markAsRead(id: string) {
    this.patch(id, { unreadCount: 0 });
  }

  recordSentMessage(id: string, text: string, sentAt: Date) {
    this.patch(id, { lastMessage: text, lastMessageAt: sentAt });
  }

  private patch(id: string, changes: Partial<Conversation>) {
    this.ConversationsState.update((all) =>
      all.map((c) => (c.id === id ? { ...c, ...changes } : c)),
    );
  }
}
