import { Service, inject } from '@angular/core';
import { Conversation } from '@shared/models/conversation-model';
import { ConversationRepository } from './conversation-repository';
import { MOCK_CONVERSATIONS } from './conversations-mock-data';
import { MOCK_LATENCY_MS } from './mock-latency';

@Service({ autoProvided: false })
export class MockConversationRepository extends ConversationRepository {
  private readonly latency = inject(MOCK_LATENCY_MS);

  override getAll(): Promise<Conversation[]> {
    return new Promise((resolve) =>
      setTimeout(() => resolve(structuredClone(MOCK_CONVERSATIONS)), this.latency),
    );
  }
}
