import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Prescripcion } from '../models/prescripcion.model';

@Injectable({
  providedIn: 'root'
})
export class PrescripcionService {
  private apiUrl = 'http://localhost:8080/prescripcion';

  constructor(private http: HttpClient) { }

  obtenerTodos(): Observable<Prescripcion[]> {
    return this.http.get<Prescripcion[]>(this.apiUrl);
  }

  obtenerPorId(id: number): Observable<Prescripcion> {
    return this.http.get<Prescripcion>(`${this.apiUrl}/${id}`).pipe(
      catchError(error => {
        if (error.status === 404) return throwError(() => 'Prescripción no encontrada');
        return throwError(() => 'Error al obtener prescripción');
      })
    );
  }

  crear(prescripcion: Prescripcion): Observable<boolean> {
    return this.http.post<boolean>(this.apiUrl, prescripcion);
  }

  actualizar(id: number, prescripcion: Prescripcion): Observable<boolean> {
    return this.http.put<boolean>(`${this.apiUrl}/${id}`, prescripcion);
  }

  eliminar(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.apiUrl}/${id}`);
  }

  obtenerPorConsulta(idConsulta: number): Observable<Prescripcion[]> {
    return this.http.get<Prescripcion[]>(`${this.apiUrl}/consulta/${idConsulta}`);
  }
}