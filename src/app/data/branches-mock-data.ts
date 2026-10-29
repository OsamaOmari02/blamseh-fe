import { Branch, TimeRange } from '@shared/models/branch-model';

const WORKDAY: TimeRange = { opens: '09:00', closes: '18:00' };
const SATURDAY: TimeRange = { opens: '10:00', closes: '16:00' };

//                          Sun      Mon      Tue      Wed      Thu      Fri   Sat
const STANDARD_HOURS = [WORKDAY, WORKDAY, WORKDAY, WORKDAY, WORKDAY, null, SATURDAY];

export const MOCK_BRANCHES: Branch[] = [
  { id: 'br1', businessId: 'b1', name: 'Al-Noor Downtown', city: 'Amman', hours: STANDARD_HOURS },
  { id: 'br2', businessId: 'b1', name: 'Al-Noor North', city: 'Irbid', hours: STANDARD_HOURS },
  { id: 'br3', businessId: 'b2', name: 'Orbit Seaside', city: 'Aqaba', hours: STANDARD_HOURS },
  { id: 'br4', businessId: 'b2', name: 'Orbit Industrial', city: 'Zarqa', hours: STANDARD_HOURS },
];
