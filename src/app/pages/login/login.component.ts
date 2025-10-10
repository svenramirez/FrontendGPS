import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FieldErrorComponent } from '../../shared/field-error/field-error.component';
import { RouterModule } from '@angular/router';
// Update the import path if necessary, or create the file if it doesn't exist
import { ApiService } from '../../core/services/api.service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule, FieldErrorComponent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;
  loading: boolean = false;
  message: string = '';

  constructor(private apiService: ApiService, private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      code: ['', [Validators.required, Validators.pattern(/^\d{7,10}$/)]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  login() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      this.message = '';
      return;
    }
    const { code, password } = this.loginForm.value;
    this.loading = true;
    this.message = '';
    this.apiService.loginStudent(code, password).subscribe({
      next: (res) => {
        this.loading = false;
        if (res.length > 0) {
          const user = res[0];
          this.message = `✅ Bienvenido, ${user.name}`;
          console.log('Usuario autenticado:', user);
        } else {
          this.message = '❌ Código o contraseña incorrectos.';
        }
      },
      error: (err) => {
        this.loading = false;
        this.message = '❌ Error al conectar con el servidor.';
        console.error(err);
      }
    });
  }
}
