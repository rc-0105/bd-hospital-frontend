import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Medico } from '../models/medico.model';

@Injectable({
  providedIn: 'root'
})
export class MedicoService {
  private apiUrl = 'http://localhost:8080/medico';

  constructor(private http: HttpClient) { }

  obtenerTodos(): Observable<Medico[]> {
    return this.http.get<Medico[]>(this.apiUrl);
  }

  obtenerPorId(id: number): Observable<Medico> {
    return this.http.get<Medico>(`${this.apiUrl}/${id}`).pipe(
      catchError(error => {
        if (error.status === 404) return throwError(() => 'Médico no encontrado');
        return throwError(() => 'Error al obtener médico');
      })
    );
  }

  crear(medico: Medico): Observable<boolean> {
    return this.http.post<boolean>(this.apiUrl, medico);
  }

  actualizar(id: number, medico: Medico): Observable<boolean> {
    return this.http.put<boolean>(`${this.apiUrl}/${id}`, medico);
  }

  eliminar(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.apiUrl}/${id}`);
  }
}