import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { APP_ROUTES } from '@core/constants/app-routes';
import { AuthService } from '@core/services/auth-service';
import { LoginForm } from '../../components/login-form/login-form';
import { LoginCredentials } from '../../models/login-credentials-model';

@Component({
  selector: 'app-login-page',
  imports: [LoginForm],
  templateUrl: './login-page.html',
  styleUrl: './login-page.scss',
})
export class LoginPage {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  protected readonly loading = signal(false);
  protected readonly error = signal<string | null>(null);

  protected async login(credentials: LoginCredentials) {
    this.loading.set(true);
    this.error.set(null);

    try {
      await this.authService.login(credentials.email, credentials.password);
      await this.router.navigate(['/', APP_ROUTES.inbox]);
    } catch (e) {
      this.error.set(e instanceof Error ? e.message : 'Something went wrong');
    } finally {
      this.loading.set(false);
    }
  }
}
