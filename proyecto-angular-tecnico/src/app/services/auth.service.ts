import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/api/auth'; // Asegúrate de que coincida con tu Spring Boot

  // 1. Registro de usuario
  register(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, userData);
  }

  // 2. Login: Guardamos el token y el rol en el navegador
  login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
      tap((res: any) => {
        // Guardamos los datos para que no se borren al refrescar la página
        localStorage.setItem('token', res.token);
        localStorage.setItem('role', res.rol); 
        localStorage.setItem('username', res.username);
      })
    );
  }

  // 3. Verificar si hay alguien logueado
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  // 4. Obtener el rol para saber si es ADMIN
  getRole(): string | null {
    return localStorage.getItem('role');
  }

  isAdmin(): boolean {
    return this.getRole() === 'ADMIN';
  }

  // 5. Cerrar sesión
  logout(): void {
    localStorage.clear();
    window.location.reload(); // Recarga para limpiar el estado de la app
  }
}