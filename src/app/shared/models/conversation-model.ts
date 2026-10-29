export interface Conversation {
  id: string;
  contactName: string;
  lastMessage: string;
  lastMessageAt: Date;
  unreadCount: number;
  assignedToMe: boolean;
  businessId: string;
}
