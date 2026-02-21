import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/api/auth';

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
      tap((res: any) => {
        if (res.token) {
          localStorage.setItem('token', res.token); // Guarda el JWT
        }
        if (res.username) {
          localStorage.setItem('username', res.username);
        }
        if (res.role) {
          localStorage.setItem('role', res.role);
        }
      })
    );
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('role');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getUsername(): string {
    return localStorage.getItem('username') ?? '';
  }

  getUserName(): string {
    return this.getUsername();
  }

  getRole(): string {
    return localStorage.getItem('role') ?? '';
  }
  
  register(userData: any): Observable<any> {
  return this.http.post('http://localhost:8080/api/auth/register', userData);
}

}