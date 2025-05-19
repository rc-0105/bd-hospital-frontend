import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { JornadaLaboral } from '../models/jornada-laboral.model';

@Injectable({
  providedIn: 'root'
})
export class JornadaLaboralService {
  private apiUrl = 'http://localhost:8080/jornada-laboral';

  constructor(private http: HttpClient) { }

  obtenerTodos(): Observable<JornadaLaboral[]> {
    return this.http.get<JornadaLaboral[]>(this.apiUrl);
  }

  obtenerPorId(id: number): Observable<JornadaLaboral> {
    return this.http.get<JornadaLaboral>(`${this.apiUrl}/${id}`).pipe(
      catchError(error => {
        if (error.status === 404) return throwError(() => 'Jornada no encontrada');
        return throwError(() => 'Error al obtener jornada laboral');
      })
    );
  }

  crear(jornada: JornadaLaboral): Observable<boolean> {
    return this.http.post<boolean>(this.apiUrl, jornada);
  }

  actualizar(id: number, jornada: JornadaLaboral): Observable<boolean> {
    return this.http.put<boolean>(`${this.apiUrl}/${id}`, jornada);
  }

  eliminar(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.apiUrl}/${id}`);
  }

  obtenerPorEmpleado(idEmpleado: number): Observable<JornadaLaboral[]> {
    return this.http.get<JornadaLaboral[]>(`${this.apiUrl}/empleado/${idEmpleado}`);
  }
}