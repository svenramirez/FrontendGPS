import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ApiService } from '../../core/services/api.service';
import { apiConstants } from '../../core/constants/api.constants';
import { Attendance, AttendanceFilters } from '../../core/interfaces/attendance.interface';

@Component({
  selector: 'app-attendance-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatTableModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  templateUrl: './attendance-register.component.html',
  styleUrl: './attendance-register.component.scss'
})
export class AttendanceRegisterComponent implements OnInit {
  attendanceForm: FormGroup;
  filterForm: FormGroup;
  isLoading = false;
  isLoadingList = false;
  studentData: any = null;
  errorMessage = '';
  
  // Lista de asistencias
  attendancesList: Attendance[] = [];
  displayedColumns: string[] = ['codigo', 'nombre', 'documento', 'rol', 'fecha'];

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    this.attendanceForm = this.fb.group({
      studentCode: ['', [Validators.required, Validators.minLength(7), Validators.pattern('^[0-9]+$')]]
    });

    this.filterForm = this.fb.group({
      start: [''],
      end: [''],
      userCode: ['']
    });
  }

  ngOnInit() {
    this.loadAttendances();
  }

  loadAttendances(filters?: AttendanceFilters) {
    this.isLoadingList = true;
    
    const params: { [key: string]: string } = {};
    
    if (filters?.start) {
      params['start'] = new Date(filters.start).toISOString();
    }
    if (filters?.end) {
      params['end'] = new Date(filters.end).toISOString();
    }
    if (filters?.userCode) {
      params['userCode'] = filters.userCode;
    }

    this.apiService.get<Attendance[]>(apiConstants.LIST_ATTENDANCES, params).subscribe({
      next: (response) => {
        this.isLoadingList = false;
        this.attendancesList = response.map(attendance => ({
          ...attendance,
          user: {
            ...attendance.user,
            name: this.decodeSpecialCharacters(attendance.user.name)
          }
        }));
      },
      error: (error) => {
        this.isLoadingList = false;
        console.error('Error cargando asistencias:', error);
        this.showSnackBar('Error al cargar las asistencias', 'error');
      }
    });
  }

  onFilterAttendances() {
    const filters: AttendanceFilters = {
      start: this.filterForm.get('start')?.value,
      end: this.filterForm.get('end')?.value,
      userCode: this.filterForm.get('userCode')?.value
    };
    
    this.loadAttendances(filters);
  }

  clearFilters() {
    this.filterForm.reset();
    this.loadAttendances();
  }

  onSearchStudent() {
    if (this.attendanceForm.get('studentCode')?.invalid) {
      this.attendanceForm.markAllAsTouched();
      return;
    }

    const studentCode = this.attendanceForm.get('studentCode')?.value;
    this.isLoading = true;
    this.studentData = null;
    this.errorMessage = '';

    this.apiService.post(`${apiConstants.ATTENDANCES}/${studentCode}`, {}).subscribe({
      next: (response: any) => {
        this.isLoading = false;
        this.studentData = response.user; 
        this.errorMessage = '';
        
        if (this.studentData.name) {
          this.studentData.name = this.decodeSpecialCharacters(this.studentData.name);
        }
        
        this.showSnackBar('Asistencia registrada exitosamente', 'success');
        
        // Recargar la lista de asistencias
        this.loadAttendances();
      },
      error: (error) => {
        this.isLoading = false;
        
        if (error.status === 404) {
          this.errorMessage = 'Estudiante no encontrado. Verifique el código.';
        } else if (error.status === 400) {
          this.errorMessage = 'La asistencia ya fue registrada hoy para este estudiante.';
        } else if (error.status === 401) {
          this.errorMessage = 'No autorizado. Token inválido o expirado.';
          this.router.navigate(['/login']);
        } else if (error.status === 403) {
          this.errorMessage = 'No tiene permisos para realizar esta acción.';
        } else if (error.status === 500) {
          this.errorMessage = 'Error interno del servidor. Contacte al administrador.';
        } else {
          this.errorMessage = `Error al registrar la asistencia: ${error.message}`;
        }
        this.showSnackBar(this.errorMessage, 'error');
      }
    });
  }

  resetForm() {
    this.attendanceForm.reset();
    this.studentData = null;
    this.errorMessage = '';
  }

  formatDate(timestamp: string): string {
    return new Date(timestamp).toLocaleString('es-CO', {
      timeZone: 'America/Bogota',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  }

  private showSnackBar(message: string, type: 'success' | 'error') {
    this.snackBar.open(message, 'Cerrar', {
      duration: 5000,
      panelClass: type === 'success' ? 'snackbar-success' : 'snackbar-error'
    });
  }

  get currentTime(): string {
    return new Date().toLocaleString('es-CO', {
      timeZone: 'America/Bogota',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  }

  private decodeSpecialCharacters(text: string): string {
    if (!text) return '';
    
    return text
      .replace(/Ã±/g, 'ñ')
      .replace(/Ã¡/g, 'á')
      .replace(/Ã©/g, 'é')
      .replace(/Ã­/g, 'í')
      .replace(/Ã³/g, 'ó')
      .replace(/Ãº/g, 'ú')
      .replace(/Ã/g, 'Á')
      .replace(/Ã‰/g, 'É')
      .replace(/Ã/g, 'Í')
      .replace(/Ã"/g, 'Ó')
      .replace(/Ãš/g, 'Ú')
      .replace(/Ã¼/g, 'ü')
      .replace(/Ã‡/g, 'Ç');
  }
}