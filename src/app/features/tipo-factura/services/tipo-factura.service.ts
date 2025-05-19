import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { TipoFactura } from '../models/tipo-factura.model';

@Injectable({
  providedIn: 'root'
})
export class TipoFacturaService {
  private apiUrl = 'http://localhost:8080/tipo-factura';

  constructor(private http: HttpClient) { }

  obtenerTodos(): Observable<TipoFactura[]> {
    return this.http.get<TipoFactura[]>(this.apiUrl);
  }

  obtenerPorId(id: number): Observable<TipoFactura> {
    return this.http.get<TipoFactura>(`${this.apiUrl}/${id}`).pipe(
      catchError(error => {
        if (error.status === 404) return throwError(() => 'Tipo de factura no encontrado');
        return throwError(() => 'Error al obtener tipo de factura');
      })
    );
  }

  crear(tipoFactura: TipoFactura): Observable<boolean> {
    return this.http.post<boolean>(this.apiUrl, tipoFactura);
  }

  actualizar(id: number, tipoFactura: TipoFactura): Observable<boolean> {
    return this.http.put<boolean>(`${this.apiUrl}/${id}`, tipoFactura);
  }

  eliminar(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.apiUrl}/${id}`);
  }
}