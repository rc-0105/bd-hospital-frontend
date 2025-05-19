import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { JornadaDia } from '../models/jornada-dia.model';

@Injectable({
  providedIn: 'root'
})
export class JornadaDiaService {
  private apiUrl = 'http://localhost:8080/jornada_dia';

  constructor(private http: HttpClient) { }

  obtenerTodos(): Observable<JornadaDia[]> {
    return this.http.get<JornadaDia[]>(this.apiUrl);
  }

  obtenerPorId(id: number): Observable<JornadaDia> {
    return this.http.get<JornadaDia>(`${this.apiUrl}/${id}`).pipe(
      catchError(error => {
        if (error.status === 404) return throwError(() => 'Jornada no encontrada');
        return throwError(() => 'Error al obtener jornada');
      })
    );
  }

  crear(jornada: JornadaDia): Observable<boolean> {
    return this.http.post<boolean>(this.apiUrl, jornada);
  }

  actualizar(id: number, jornada: JornadaDia): Observable<boolean> {
    return this.http.put<boolean>(`${this.apiUrl}/${id}`, jornada);
  }

  eliminar(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.apiUrl}/${id}`);
  }
}