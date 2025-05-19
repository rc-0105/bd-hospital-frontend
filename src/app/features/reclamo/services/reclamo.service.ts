import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Reclamo } from '../models/reclamo.model';

@Injectable({
  providedIn: 'root'
})
export class ReclamoService {
  private apiUrl = 'http://localhost:8080/reclamo';

  constructor(private http: HttpClient) { }

  obtenerTodos(): Observable<Reclamo[]> {
    return this.http.get<Reclamo[]>(this.apiUrl);
  }

  obtenerPorId(id: number): Observable<Reclamo> {
    return this.http.get<Reclamo>(`${this.apiUrl}/${id}`).pipe(
      catchError(error => {
        if (error.status === 404) return throwError(() => 'Reclamo no encontrado');
        return throwError(() => 'Error al obtener reclamo');
      })
    );
  }

  crear(reclamo: Reclamo): Observable<boolean> {
    return this.http.post<boolean>(this.apiUrl, reclamo);
  }

  actualizar(id: number, reclamo: Reclamo): Observable<boolean> {
    return this.http.put<boolean>(`${this.apiUrl}/${id}`, reclamo);
  }

  eliminar(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.apiUrl}/${id}`);
  }
}