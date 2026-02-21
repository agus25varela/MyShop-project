import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = 'http://localhost:8080/api/productos';

  constructor(private http: HttpClient) {}

  // Obtener datos (GET)
  listar(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Obtener datos (GET) 
  getProducts(): Observable<any[]> {
    return this.listar();
  }

  // Guardar datos (POST)
  crear(producto: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, producto);
  }
}
