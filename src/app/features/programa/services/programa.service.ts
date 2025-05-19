import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Programa } from '../models/programa.model';

@Injectable({
  providedIn: 'root'
})
export class ProgramaService {
  private apiUrl = 'http://localhost:8080/programa';

  constructor(private http: HttpClient) { }

  obtenerTodos(): Observable<Programa[]> {
    return this.http.get<Programa[]>(this.apiUrl);
  }

  obtenerPorId(id: number): Observable<Programa> {
    return this.http.get<Programa>(`${this.apiUrl}/${id}`).pipe(
      catchError(error => {
        if (error.status === 404) return throwError(() => 'Programa no encontrado');
        return throwError(() => 'Error al obtener programa');
      })
    );
  }

  crear(programa: Programa): Observable<boolean> {
    return this.http.post<boolean>(this.apiUrl, programa);
  }

  actualizar(id: number, programa: Programa): Observable<boolean> {
    return this.http.put<boolean>(`${this.apiUrl}/${id}`, programa);
  }

  eliminar(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.apiUrl}/${id}`);
  }
}