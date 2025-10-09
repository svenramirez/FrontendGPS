import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
// Update the import path if necessary, or create the file if it doesn't exist
import { ApiService } from '../../core/services/api.service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  code: string = '';
  rol: string = '';
  loading: boolean = false;
  message: string = '';
  codeError: string = '';
  rolError: string = '';

  constructor(private apiService: ApiService) {}

  login() {
    this.codeError = '';
    this.rolError = '';
    let valid = true;

    if (!this.code) {
      this.codeError = 'El código es obligatorio.';
      valid = false;
    } else if (!/^\d{7,10}$/.test(this.code)) {
      this.codeError = 'El código debe ser un número de 7 a 10 dígitos.';
      valid = false;
    }

    // Validación de rol: requerido y solo letras
    if (!this.rol) {
      this.rolError = 'El rol es obligatorio.';
      valid = false;
    } else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]+$/.test(this.rol)) {
      this.rolError = 'El rol solo debe contener letras.';
      valid = false;
    }

    if (!valid) {
      this.message = '';
      return;
    }

    this.loading = true;
    this.message = '';

    this.apiService.loginStudent(this.code, this.rol).subscribe({
      next: (res) => {
        this.loading = false;

        if (res.length > 0) {
          const user = res[0];
          this.message = `✅ Bienvenido, ${user.name}`;
          console.log('Usuario autenticado:', user);
        } else {
          this.message = '❌ Código o rol incorrectos.';
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
