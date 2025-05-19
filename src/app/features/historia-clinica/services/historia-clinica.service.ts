import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { HistoriaClinica } from '../models/historia-clinica.model';

@Injectable({
  providedIn: 'root'
})
export class HistoriaClinicaService {
  private apiUrl = 'http://localhost:8080/historia-clinica';

  constructor(private http: HttpClient) { }

  obtenerTodos(): Observable<HistoriaClinica[]> {
    return this.http.get<HistoriaClinica[]>(this.apiUrl);
  }

  obtenerPorId(id: number): Observable<HistoriaClinica> {
    return this.http.get<HistoriaClinica>(`${this.apiUrl}/${id}`).pipe(
      catchError(error => {
        if (error.status === 404) return throwError(() => 'Historia clínica no encontrada');
        return throwError(() => 'Error al obtener historia clínica');
      })
    );
  }

  obtenerPorPaciente(idPaciente: number): Observable<HistoriaClinica[]> {
    return this.http.get<HistoriaClinica[]>(`${this.apiUrl}/paciente/${idPaciente}`);
  }

  crear(historia: HistoriaClinica): Observable<boolean> {
    return this.http.post<boolean>(this.apiUrl, historia);
  }

  actualizar(id: number, historia: HistoriaClinica): Observable<boolean> {
    return this.http.put<boolean>(`${this.apiUrl}/${id}`, historia);
  }

  eliminar(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.apiUrl}/${id}`);
  }
}