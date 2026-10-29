import { inject, Service, signal } from '@angular/core';
import { ConversationStoreService } from '@core/services/conversation-store-servce';
import { ConversationRepository } from '@data/conversation-repository';

@Service()
export class InboxService {
  private readonly repository = inject(ConversationRepository);
  private readonly storeService = inject(ConversationStoreService);

  private readonly loadingState = signal(false);
  private readonly errorState = signal<string | null>(null);

  private loaded = false;

  readonly conversations = this.storeService.conversations;
  readonly activeId = this.storeService.activeId;
  readonly loading = this.loadingState.asReadonly();
  readonly error = this.errorState.asReadonly();

  async load() {
    if (this.loaded || this.loadingState()) return;
    this.loadingState.set(true);
    this.errorState.set(null);

    try {
      this.storeService.setAll(await this.repository.getAll());
      this.loaded = true;
    } catch {
      this.errorState.set('Could not load conversations');
    } finally {
      this.loadingState.set(false);
    }
  }
}
