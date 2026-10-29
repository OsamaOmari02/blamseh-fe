export enum InboxFilter {
  All = 'all',
  Unread = 'unread',
  Assigned = 'assigned',
}

export function parseInboxFilter(value: unknown): InboxFilter {
  return Object.values(InboxFilter).find((filter) => filter === value) ?? InboxFilter.All;
}
