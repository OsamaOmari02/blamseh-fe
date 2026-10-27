import { Component, model } from '@angular/core';
import { InboxFilter } from '../../enums/inbox-filter-enum';

interface FilterOption {
  value: InboxFilter;
  label: string;
}

@Component({
  selector: 'app-inbox-filter-bar',
  templateUrl: './inbox-filter-bar.html',
  styleUrl: './inbox-filter-bar.scss',
})
export class InboxFilterBar {
  readonly active = model<InboxFilter>(InboxFilter.All);

  protected readonly options: FilterOption[] = [
    { value: InboxFilter.All, label: 'All' },
    { value: InboxFilter.Unread, label: 'Unread' },
    { value: InboxFilter.Assigned, label: 'Assigned to me' },
  ];

  protected selectFilter(filter: InboxFilter) {
    this.active.set(filter);
  }
}
