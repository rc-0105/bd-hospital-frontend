import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Cita } from '../models/cita.model';

@Injectable({
  providedIn: 'root'
})
export class CitaService {
  private apiUrl = 'http://localhost:8080/cita';

  constructor(private http: HttpClient) { }

  obtenerTodas(): Observable<Cita[]> {
    return this.http.get<Cita[]>(this.apiUrl);
  }

  obtenerPorId(id: number): Observable<Cita> {
    return this.http.get<Cita>(`${this.apiUrl}/${id}`).pipe(
      catchError(error => {
        if (error.status === 404) return throwError(() => 'Cita no encontrada');
        return throwError(() => 'Error al obtener cita');
      })
    );
  }

  obtenerPorPaciente(idPaciente: number): Observable<Cita[]> {
    return this.http.get<Cita[]>(`${this.apiUrl}/paciente/${idPaciente}`);
  }

  obtenerPorMedico(idMedico: number): Observable<Cita[]> {
    return this.http.get<Cita[]>(`${this.apiUrl}/medico/${idMedico}`);
  }

  obtenerPorEstado(estado: string): Observable<Cita[]> {
    return this.http.get<Cita[]>(`${this.apiUrl}/estado/${estado}`);
  }

  crear(cita: Cita): Observable<boolean> {
    return this.http.post<boolean>(this.apiUrl, cita);
  }

  actualizar(id: number, cita: Cita): Observable<boolean> {
    return this.http.put<boolean>(`${this.apiUrl}/${id}`, cita);
  }

  eliminar(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.apiUrl}/${id}`);
  }
}