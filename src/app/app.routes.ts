import { Routes } from '@angular/router';
import { LoginComponent } from './auth/pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';


export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: DashboardComponent },
  // TODO: Crear estos componentes cuando sea necesario
  // { path: 'agendar-practica', loadComponent: () => import('./pages/agendar-practica/agendar-practica.component').then(m => m.AgendarPracticaComponent) },
  // { path: 'equipos', loadComponent: () => import('./pages/equipos/equipos.component').then(m => m.EquiposComponent) },
  // { path: 'gestion-usuarios', loadComponent: () => import('./pages/gestion-usuarios/gestion-usuarios.component').then(m => m.GestionUsuariosComponent) },
  // { path: 'registro-asistencias', loadComponent: () => import('./pages/registro-asistencias/registro-asistencias.component').then(m => m.RegistroAsistenciasComponent) },
  // { path: 'servicios-practicas', loadComponent: () => import('./pages/servicios-practicas/servicios-practicas.component').then(m => m.ServiciosPracticasComponent) },
  // { path: 'ingresar-equipos', loadComponent: () => import('./pages/ingresar-equipos/ingresar-equipos.component').then(m => m.IngresarEquiposComponent) },
  // { path: 'prestamo-equipos', loadComponent: () => import('./pages/prestamo-equipos/prestamo-equipos.component').then(m => m.PrestamoEquiposComponent) },
  { path: '**', redirectTo: 'login' }
];
