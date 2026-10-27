// The Angular guide specifically says to avoid generic names like utils.ts, helpers.ts, or common.ts
export function minutesAgo(minutes: number): Date {
  return new Date(Date.now() - minutes * 60_000);
}
