import { Service, computed, signal } from '@angular/core';
import { Business } from '@shared/models/business-model';

const MOCK_BUSINESSES: Business[] = [
  { id: 'b1', name: 'Al-Noor Electronics' },
  { id: 'b2', name: 'Orbit Gadgets' },
];

@Service()
export class CurrentBusinessService {
  private readonly selectedIdState = signal(MOCK_BUSINESSES[0].id);

  readonly businesses: readonly Business[] = MOCK_BUSINESSES;
  readonly selectedId = this.selectedIdState.asReadonly();

  readonly selected = computed(
    () => this.businesses.find((b) => b.id === this.selectedIdState()) ?? this.businesses[0],
  );

  select(id: string) {
    this.selectedIdState.set(id);
  }
}
