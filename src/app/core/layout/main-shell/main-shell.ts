import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { APP_ROUTES } from '@core/constants/app-routes';
import { AuthService } from '../../services/auth-service';
import { BottomNav } from '../bottom-nav/bottom-nav';
import { BusinessSwitcher } from '../business-switcher/business-switcher';
import { TopBar } from '../top-bar/top-bar';

@Component({
  selector: 'app-main-shell',
  imports: [RouterOutlet, TopBar, BottomNav, BusinessSwitcher],
  templateUrl: './main-shell.html',
  styleUrl: './main-shell.scss',
})
export class MainShell {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  protected logout() {
    this.authService.logout();
    this.router.navigate(['/', APP_ROUTES.login]);
  }
}
