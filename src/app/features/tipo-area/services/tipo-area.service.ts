import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { TipoArea } from '../models/tipo-area.model';

@Injectable({
  providedIn: 'root'
})
export class TipoAreaService {
  private apiUrl = 'http://localhost:8080/tipoarea';

  constructor(private http: HttpClient) { }

  obtenerTodos(): Observable<TipoArea[]> {
    return this.http.get<TipoArea[]>(this.apiUrl);
  }

  obtenerPorId(id: number): Observable<TipoArea> {
    return this.http.get<TipoArea>(`${this.apiUrl}/${id}`).pipe(
      catchError(error => {
        if (error.status === 404) return throwError(() => 'Tipo de área no encontrado');
        return throwError(() => 'Error al obtener tipo de área');
      })
    );
  }

  crear(tipoArea: TipoArea): Observable<boolean> {
    return this.http.post<boolean>(this.apiUrl, tipoArea);
  }

  actualizar(id: number, tipoArea: TipoArea): Observable<boolean> {
    return this.http.put<boolean>(`${this.apiUrl}/${id}`, tipoArea);
  }

  eliminar(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.apiUrl}/${id}`);
  }
}