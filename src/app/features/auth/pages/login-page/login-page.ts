import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { APP_ROUTES } from '@core/constants/app-routes';
import { LoginForm } from '../../components/login-form/login-form';

@Component({
  imports: [LoginForm],
  selector: 'app-login-page',
  styleUrl: './login-page.scss',
  templateUrl: './login-page.html',
})
export class LoginPage {
  private router = inject(Router);

  loading = signal(false);
  error = signal<string | null>(null);

  onLogin(credentials: { email: string; password: string }) {
    this.loading.set(true);
    this.error.set(null);
    try {
      this.router.navigate([APP_ROUTES.inbox]);
    } catch (error) {
      console.log(error);
      this.error.set('Invalid email or password');
    } finally {
      this.loading.set(false);
    }
  }
}
