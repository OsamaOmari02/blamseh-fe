import { Component, inject, input, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginCredentials } from '../../models/login-credentials-model';

@Component({
  selector: 'app-login-form',
  imports: [ReactiveFormsModule],
  templateUrl: './login-form.html',
  styleUrl: './login-form.scss',
})
export class LoginForm {
  private readonly formBuilder = inject(FormBuilder);

  readonly loading = input(false);
  readonly error = input<string | null>(null);
  readonly submitted = output<LoginCredentials>();

  protected readonly form = this.formBuilder.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  protected submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched(); // shows every error at once
      return;
    }
    this.submitted.emit(this.form.getRawValue());
  }
}
