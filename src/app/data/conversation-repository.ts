import { Conversation } from '@shared/models/conversation-model';

export abstract class ConversationRepository {
  abstract getAll(): Promise<Conversation[]>;
}
