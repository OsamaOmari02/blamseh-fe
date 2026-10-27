import { Message } from './message-model';

export interface ChatThread {
  contactName: string;
  messages: Message[];
}
