import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { TipoDocumento } from '../models/tipo-documento.model';

@Injectable({
  providedIn: 'root'
})
export class TipoDocumentoService {
  private apiUrl = 'http://localhost:8080/tipodocumento';

  constructor(private http: HttpClient) { }

  obtenerTodos(): Observable<TipoDocumento[]> {
    return this.http.get<TipoDocumento[]>(this.apiUrl);
  }

  obtenerPorId(id: number): Observable<TipoDocumento> {
    return this.http.get<TipoDocumento>(`${this.apiUrl}/${id}`).pipe(
      catchError(error => {
        if (error.status === 404) return throwError(() => 'Tipo de documento no encontrado');
        return throwError(() => 'Error al obtener tipo de documento');
      })
    );
  }

  crear(tipoDocumento: TipoDocumento): Observable<boolean> {
    return this.http.post<boolean>(this.apiUrl, tipoDocumento);
  }

  actualizar(id: number, tipoDocumento: TipoDocumento): Observable<boolean> {
    return this.http.put<boolean>(`${this.apiUrl}/${id}`, tipoDocumento);
  }

  eliminar(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.apiUrl}/${id}`);
  }
}