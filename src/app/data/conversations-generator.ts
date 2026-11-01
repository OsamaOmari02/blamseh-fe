import { Conversation } from '@shared/models/conversation-model';

const FIRST_NAMES = [
  'Sara',
  'Omar',
  'Lina',
  'Yazan',
  'Hala',
  'Khaled',
  'Dana',
  'Fadi',
  'Noor',
  'Rami',
  'Maya',
  'Tariq',
];
const LAST_NAMES = [
  'Khalil',
  'Haddad',
  'Nasser',
  'Odeh',
  'Mansour',
  'Saleh',
  'Qasem',
  'Barakat',
  'Hijazi',
  'Obeidat',
];
const MESSAGES = [
  'Is this still available?',
  'Can you send the price list?',
  'Thanks, received!',
  'When will it ship?',
  'Do you have it in another color?',
  'Please confirm my order',
  'I need an invoice',
  'Can I change the delivery address?',
];

export function generateConversations(count: number): Conversation[] {
  return Array.from({ length: count }, (_, index) => {
    const minutesAgo = 10 + index * 7; // older as the index grows

    return {
      id: `g-${index}`,
      businessId: index % 2 === 0 ? 'b1' : 'b2',
      contactName: `${FIRST_NAMES[index % FIRST_NAMES.length]} ${
        LAST_NAMES[Math.floor(index / FIRST_NAMES.length) % LAST_NAMES.length]
      }`,
      lastMessage: MESSAGES[index % MESSAGES.length],
      lastMessageAt: new Date(Date.now() - minutesAgo * 60_000),
      unreadCount: index % 7 === 0 ? (index % 5) + 1 : 0,
      assignedToMe: index % 3 === 0,
    };
  });
}
