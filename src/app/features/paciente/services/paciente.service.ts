import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Paciente } from '../models/paciente.model';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {
  private apiUrl = 'http://localhost:8080/paciente';

  constructor(private http: HttpClient) { }

  obtenerTodos(): Observable<Paciente[]> {
    return this.http.get<Paciente[]>(this.apiUrl);
  }

  obtenerPorId(id: number): Observable<Paciente> {
    return this.http.get<Paciente>(`${this.apiUrl}/${id}`).pipe(
      catchError(error => {
        if (error.status === 404) return throwError(() => 'Paciente no encontrado');
        return throwError(() => 'Error al obtener paciente');
      })
    );
  }

  obtenerPorSeguro(idSeguro: number): Observable<Paciente[]> {
    return this.http.get<Paciente[]>(`${this.apiUrl}/seguro/${idSeguro}`);
  }

  crear(paciente: Paciente): Observable<boolean> {
    return this.http.post<boolean>(this.apiUrl, paciente);
  }

  actualizar(id: number, paciente: Paciente): Observable<boolean> {
    return this.http.put<boolean>(`${this.apiUrl}/${id}`, paciente);
  }

  eliminar(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.apiUrl}/${id}`);
  }
}