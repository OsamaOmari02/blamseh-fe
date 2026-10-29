export interface TimeRange {
  opens: string; // 'HH:mm'
  closes: string; // 'HH:mm'
}

export interface Branch {
  id: string;
  businessId: string;
  name: string;
  city: string;
  hours: (TimeRange | null)[]; // index = weekday, 0 = Sunday; null = closed that day
}
