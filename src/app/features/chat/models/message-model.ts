import { MessageStatus } from '../enums/message-status-enum';

export interface Message {
  id: string;
  text: string;
  sentAt: Date;
  fromMe: boolean;
  status: MessageStatus;
}
