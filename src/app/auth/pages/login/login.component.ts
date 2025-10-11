import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FieldErrorComponent } from '../../../shared/field-error/field-error.component';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule, FieldErrorComponent],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  loginForm: FormGroup;
  loading = false;
  message = '';
  showPassword = false;

  constructor(private readonly authService: AuthService, private readonly fb: FormBuilder) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required,]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  login() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      this.message = '';
      return;
    }

    const { username, password } = this.loginForm.value;
    this.loading = true;
    this.message = '';

    this.authService.login(username, password).subscribe({
      next: (user) => {
        this.message = `✅ Bienvenido, ${user.name}`;
        console.log('Usuario autenticado:', user);
        this.loading = false;
      },
      error: (err) => {
        this.loading = false;
        this.message = '❌ ' + (err.error?.message || 'Error en la autenticación');
        console.error(err);
      },
    });
  }
}
