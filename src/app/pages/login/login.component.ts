import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
// Update the import path if necessary, or create the file if it doesn't exist
import { ApiService } from '../../core/services/api.service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  code: string = '';
  rol: string = '';
  loading: boolean = false;
  message: string = '';

  constructor(private apiService: ApiService) {}

  login() {
    if (!this.code || !this.rol) {
      this.message = 'Por favor, ingresa tu código y rol.';
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
