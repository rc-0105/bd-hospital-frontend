import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Diagnostico } from '../models/diagnostico.model';

@Injectable({
  providedIn: 'root'
})
export class DiagnosticoService {
  private apiUrl = 'http://localhost:8080/diagnostico';

  constructor(private http: HttpClient) { }

  obtenerTodos(): Observable<Diagnostico[]> {
    return this.http.get<Diagnostico[]>(this.apiUrl);
  }

  obtenerPorId(id: number): Observable<Diagnostico> {
    return this.http.get<Diagnostico>(`${this.apiUrl}/${id}`).pipe(
      catchError(error => {
        if (error.status === 404) return throwError(() => 'Diagnóstico no encontrado');
        return throwError(() => 'Error al obtener diagnóstico');
      })
    );
  }

  crear(diagnostico: Diagnostico): Observable<boolean> {
    return this.http.post<boolean>(this.apiUrl, diagnostico);
  }

  actualizar(id: number, diagnostico: Diagnostico): Observable<boolean> {
    return this.http.put<boolean>(`${this.apiUrl}/${id}`, diagnostico);
  }

  eliminar(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.apiUrl}/${id}`);
  }
}