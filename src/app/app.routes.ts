import { Routes } from '@angular/router';
import { LoginComponent } from './auth/pages/login/login.component';

import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AttendanceRegisterComponent } from './pages/attendance-register/attendance-register.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'registro-asistencias', component: AttendanceRegisterComponent },
  { path: '**', redirectTo: 'login' }
];
