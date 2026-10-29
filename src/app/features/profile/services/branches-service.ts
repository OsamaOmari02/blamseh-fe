import { Service, computed, inject } from '@angular/core';
import { CurrentBusinessService } from '@core/services/current-business-service';
import { MOCK_BRANCHES } from '@data/branches-mock-data';

@Service()
export class BranchesService {
  private readonly currentBusiness = inject(CurrentBusinessService);

  readonly branches = computed(() =>
    MOCK_BRANCHES.filter((branch) => branch.businessId === this.currentBusiness.selectedId()),
  );
}
