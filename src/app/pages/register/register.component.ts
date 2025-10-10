import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ApiService } from '../../core/services/api.service';
import { FieldErrorComponent } from '../../shared/field-error/field-error.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule, FieldErrorComponent],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registerForm: FormGroup;
  loading = false;
  message = '';

  constructor(private apiService: ApiService, private fb: FormBuilder) {
    this.registerForm = this.fb.group({
      code: ['', [Validators.required, Validators.pattern(/^\d{7,10}$/)]],
      name: ['', [Validators.required, Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]+$/)]],
      rol: ['', [Validators.required, Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]+$/)]],
      semester: ['', [Validators.required, Validators.min(1), Validators.max(12)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  register() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      this.message = '';
      return;
    }
    this.loading = true;
    this.message = '';
    this.apiService.registerStudent(this.registerForm.value).subscribe({
      next: (res) => {
        this.loading = false;
        this.message = `✅ Estudiante ${res.name} registrado correctamente.`;
        console.log('Estudiante registrado:', res);
        this.registerForm.reset();
      },
      error: (err) => {
        this.loading = false;
        this.message = '❌ Error al registrar el estudiante.';
        console.error(err);
      }
    });
  }
}
