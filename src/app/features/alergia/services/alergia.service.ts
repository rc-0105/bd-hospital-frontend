import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Alergia } from '../models/alergia.model';

@Injectable({
  providedIn: 'root'
})
export class AlergiaService {
  private apiUrl = 'http://localhost:8080/alergia';

  constructor(private http: HttpClient) { }

  obtenerTodos(): Observable<Alergia[]> {
    return this.http.get<Alergia[]>(this.apiUrl);
  }

  obtenerPorId(id: number): Observable<Alergia> {
    return this.http.get<Alergia>(`${this.apiUrl}/${id}`).pipe(
      catchError(error => {
        if (error.status === 404) return throwError(() => 'Alergia no encontrada');
        return throwError(() => 'Error al obtener alergia');
      })
    );
  }

  crear(alergia: Alergia): Observable<boolean> {
    return this.http.post<boolean>(this.apiUrl, alergia);
  }

  actualizar(id: number, alergia: Alergia): Observable<boolean> {
    return this.http.put<boolean>(`${this.apiUrl}/${id}`, alergia);
  }

  eliminar(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.apiUrl}/${id}`);
  }

  obtenerPorHistoria(idHistoria: number): Observable<Alergia[]> {
    return this.http.get<Alergia[]>(`${this.apiUrl}/historia/${idHistoria}`);
  }
}