import { TimeRange } from '@shared/models/branch-model';

export interface OpeningStatus {
  open: boolean;
  todayRange: TimeRange | null;
}

function toMinutes(time: string): number {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
}

export function getOpeningStatus(hours: (TimeRange | null)[], localTime: string): OpeningStatus {
  const [date, time] = localTime.split('T');
  const [year, month, day] = date.split('-').map(Number);

  const weekday = new Date(year, month - 1, day).getDay(); // 0 = Sunday
  const todayRange = hours[weekday] ?? null;

  if (!todayRange) return { open: false, todayRange: null };

  const now = toMinutes(time);
  const open = now >= toMinutes(todayRange.opens) && now < toMinutes(todayRange.closes);
  return { open, todayRange };
}
