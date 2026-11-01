import { Component, computed, input } from '@angular/core';
import { TimeRange } from '@shared/models/branch-model';

const WEEKDAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

@Component({
  selector: 'app-branch-hours',
  templateUrl: './branch-hours.html',
  styleUrl: './branch-hours.scss',
})
export class BranchHours {
  readonly hours = input.required<(TimeRange | null)[]>();

  protected readonly rows = computed(() =>
    this.hours().map((range, index) => ({
      day: WEEKDAYS[index],
      closed: range === null,
      label: range ? `${range.opens} to ${range.closes}` : 'Closed',
    })),
  );
}
