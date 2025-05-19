import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { EquipoMedico } from '../models/equipo-medico.model';

@Injectable({
  providedIn: 'root'
})
export class EquipoMedicoService {
  private apiUrl = 'http://localhost:8080/equipo-medico';

  constructor(private http: HttpClient) { }

  obtenerTodos(): Observable<EquipoMedico[]> {
    return this.http.get<EquipoMedico[]>(this.apiUrl);
  }

  obtenerPorId(id: number): Observable<EquipoMedico> {
    return this.http.get<EquipoMedico>(`${this.apiUrl}/${id}`).pipe(
      catchError(error => {
        if (error.status === 404) return throwError(() => 'Equipo no encontrado');
        return throwError(() => 'Error al obtener equipo médico');
      })
    );
  }

  crear(equipo: EquipoMedico): Observable<boolean> {
    return this.http.post<boolean>(this.apiUrl, equipo);
  }

  actualizar(id: number, equipo: EquipoMedico): Observable<boolean> {
    return this.http.put<boolean>(`${this.apiUrl}/${id}`, equipo);
  }

  eliminar(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.apiUrl}/${id}`);
  }
}