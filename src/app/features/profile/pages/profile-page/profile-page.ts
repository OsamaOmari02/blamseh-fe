import { Component, inject, linkedSignal } from '@angular/core';
import { Branch } from '@shared/models/branch-model';
import { BranchWeather } from '../../components/branch-weather/branch-weather';
import { BranchesService } from '../../services/branches-service';

@Component({
  selector: 'app-profile-page',
  imports: [BranchWeather],
  templateUrl: './profile-page.html',
  styleUrl: './profile-page.scss',
})
export class ProfilePage {
  private readonly branchesService = inject(BranchesService);

  protected readonly branches = this.branchesService.branches;

  // writable, but resets to the first branch whenever the list changes (business switch)
  protected readonly selectedBranch = linkedSignal<Branch | undefined>(() => this.branches()[0]);

  protected selectBranch(branch: Branch) {
    this.selectedBranch.set(branch);
  }
}
