import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Habitacion } from '../models/habitacion.model';

@Injectable({
  providedIn: 'root'
})
export class HabitacionService {
  private apiUrl = 'http://localhost:8080/habitacion';

  constructor(private http: HttpClient) { }

  obtenerTodos(): Observable<Habitacion[]> {
    return this.http.get<Habitacion[]>(this.apiUrl);
  }

  obtenerPorId(id: number): Observable<Habitacion> {
    return this.http.get<Habitacion>(`${this.apiUrl}/${id}`).pipe(
      catchError(error => {
        if (error.status === 404) return throwError(() => 'Habitación no encontrada');
        return throwError(() => 'Error al obtener habitación');
      })
    );
  }

  crear(habitacion: Habitacion): Observable<boolean> {
    return this.http.post<boolean>(this.apiUrl, habitacion);
  }

  actualizar(id: number, habitacion: Habitacion): Observable<boolean> {
    return this.http.put<boolean>(`${this.apiUrl}/${id}`, habitacion);
  }

  eliminar(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.apiUrl}/${id}`);
  }
}