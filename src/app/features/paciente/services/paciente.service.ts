import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, tap, throwError } from 'rxjs';
import { Paciente } from '../models/paciente.model';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {
  private apiUrl = 'http://localhost:8484/paciente';
  private pacientesSubject = new BehaviorSubject<Paciente[]>([]);
  pacientes$ = this.pacientesSubject.asObservable();

  constructor(private http: HttpClient) { }

  obtenerTodos(): Observable<Paciente[]> {
    return this.http.get<Paciente[]>(this.apiUrl).pipe(
      tap(pacientes => this.pacientesSubject.next(pacientes))
    );
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