import { Component, ElementRef, inject, signal } from '@angular/core';
import { CurrentBusinessService } from '@core/services/current-business-service';
import { Business } from '@shared/models/business-model';

@Component({
  selector: 'app-business-switcher',
  templateUrl: './business-switcher.html',
  styleUrl: './business-switcher.scss',
  host: {
    '(document:click)': 'closeOnOutsideClick($event)',
    '(keydown.escape)': 'close()',
  },
})
export class BusinessSwitcher {
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  protected readonly currentBusinessService = inject(CurrentBusinessService);

  protected readonly open = signal(false);

  protected toggle() {
    this.open.update((value) => !value);
  }

  protected close() {
    this.open.set(false);
  }

  protected choose(business: Business) {
    this.currentBusinessService.select(business.id);
    this.close();
  }

  protected closeOnOutsideClick(event: MouseEvent) {
    if (!this.host.nativeElement.contains(event.target as Node)) {
      this.close();
    }
  }
}
