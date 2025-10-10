import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl = 'https://68e5f63521dd31f22cc38acb.mockapi.io/api/v1/students';

  constructor(private http: HttpClient) { }

// ✅ Obtener todos los estudiantes
  getStudents(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }

  // ✅ Registrar un nuevo estudiante
  registerStudent(student: any): Observable<any> {
    return this.http.post<any>(this.baseUrl, student);
  }

  // ✅ Login básico verificando código y contraseña
  loginStudent(code: string, password: string): Observable<any[]> {
    // filtra por código y contraseña
    return this.http.get<any[]>(`${this.baseUrl}?code=${code}&password=${password}`);
  }

  // ✅ Obtener estudiante por ID (opcional)
  getStudentById(id: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }

  // ✅ Actualizar estudiante (opcional)
  updateStudent(id: string, data: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${id}`, data);
  }

  // ✅ Eliminar estudiante (opcional)
  deleteStudent(id: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${id}`);
  }
}
