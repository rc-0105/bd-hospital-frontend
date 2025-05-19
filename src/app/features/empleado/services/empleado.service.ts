import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Empleado, EmpleadoForm } from '../models/empleado.model';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {
  private apiUrl = 'http://localhost:8080/empleado';

  constructor(private http: HttpClient) { }

  obtenerTodos(): Observable<Empleado[]> {
    return this.http.get<Empleado[]>(this.apiUrl);
  }

  obtenerPorId(id: number): Observable<Empleado> {
    return this.http.get<Empleado>(`${this.apiUrl}/${id}`).pipe(
      catchError(error => {
        if (error.status === 404) return throwError(() => 'Empleado no encontrado');
        return throwError(() => 'Error al obtener empleado');
      })
    );
  }

  crear(empleado: EmpleadoForm): Observable<boolean> {
    return this.http.post<boolean>(this.apiUrl, empleado);
  }

  actualizar(id: number, empleado: EmpleadoForm): Observable<boolean> {
    return this.http.put<boolean>(`${this.apiUrl}/${id}`, empleado);
  }

  eliminar(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.apiUrl}/${id}`);
  }
}