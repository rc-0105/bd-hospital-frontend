import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { TipoReclamo } from '../models/tipo-reclamo.model';

@Injectable({
  providedIn: 'root'
})
export class TipoReclamoService {
  private apiUrl = 'http://localhost:8080/tiporeclamo';

  constructor(private http: HttpClient) { }

  obtenerTodos(): Observable<TipoReclamo[]> {
    return this.http.get<TipoReclamo[]>(this.apiUrl);
  }

  obtenerPorId(id: number): Observable<TipoReclamo> {
    return this.http.get<TipoReclamo>(`${this.apiUrl}/${id}`).pipe(
      catchError(error => {
        if (error.status === 404) return throwError(() => 'Tipo de reclamo no encontrado');
        return throwError(() => 'Error al obtener tipo de reclamo');
      })
    );
  }

  crear(tipoReclamo: TipoReclamo): Observable<boolean> {
    return this.http.post<boolean>(this.apiUrl, tipoReclamo);
  }

  actualizar(id: number, tipoReclamo: TipoReclamo): Observable<boolean> {
    return this.http.put<boolean>(`${this.apiUrl}/${id}`, tipoReclamo);
  }

  eliminar(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.apiUrl}/${id}`);
  }
}