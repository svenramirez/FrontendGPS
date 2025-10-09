import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ApiService } from '../../core/services/api.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  student = {
    code: '',
    name: '',
    rol: '',
    semester: '',
    email: ''
  };

  message = '';
  loading = false;
  codeError: string = '';
  nameError: string = '';
  rolError: string = '';
  semesterError: string = '';
  emailError: string = '';

  constructor(private apiService: ApiService) {}

  register() {
    this.codeError = '';
    this.nameError = '';
    this.rolError = '';
    this.semesterError = '';
    this.emailError = '';
    let valid = true;

    // Código: requerido y solo números (DNI)
    if (!this.student.code) {
      this.codeError = 'El código es obligatorio.';
      valid = false;
    } else if (!/^\d{7,10}$/.test(this.student.code)) {
      this.codeError = 'El código debe ser un número de 7 a 10 dígitos.';
      valid = false;
    }

    // Nombre: requerido y solo letras y espacios
    if (!this.student.name) {
      this.nameError = 'El nombre es obligatorio.';
      valid = false;
    } else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]+$/.test(this.student.name)) {
      this.nameError = 'El nombre solo debe contener letras.';
      valid = false;
    }

    // Rol: requerido y solo letras
    if (!this.student.rol) {
      this.rolError = 'El rol es obligatorio.';
      valid = false;
    } else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]+$/.test(this.student.rol)) {
      this.rolError = 'El rol solo debe contener letras.';
      valid = false;
    }

    // Semestre: requerido y número entre 1 y 12
    if (!this.student.semester) {
      this.semesterError = 'El semestre es obligatorio.';
      valid = false;
    } else if (isNaN(Number(this.student.semester)) || Number(this.student.semester) < 1 || Number(this.student.semester) > 12) {
      this.semesterError = 'El semestre debe ser un número entre 1 y 12.';
      valid = false;
    }

    // Email: requerido y formato válido
    if (!this.student.email) {
      this.emailError = 'El correo es obligatorio.';
      valid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(this.student.email)) {
      this.emailError = 'El correo no es válido.';
      valid = false;
    }

    if (!valid) {
      this.message = '';
      return;
    }

    this.loading = true;
    this.message = '';

    this.apiService.registerStudent(this.student).subscribe({
      next: (res) => {
        this.loading = false;
        this.message = `✅ Estudiante ${res.name} registrado correctamente.`;
        console.log('Estudiante registrado:', res);

        // Reiniciar formulario
        this.student = { code: '', name: '', rol: '', semester: '', email: '' };
      },
      error: (err) => {
        this.loading = false;
        this.message = '❌ Error al registrar el estudiante.';
        console.error(err);
      }
    });
  }
}
