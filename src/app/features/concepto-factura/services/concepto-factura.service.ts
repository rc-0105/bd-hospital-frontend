import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { ConceptoFactura } from '../models/concepto-factura.model';

@Injectable({
  providedIn: 'root'
})
export class ConceptoFacturaService {
  private apiUrl = 'http://localhost:8080/concepto-factura';

  constructor(private http: HttpClient) { }

  obtenerTodos(): Observable<ConceptoFactura[]> {
    return this.http.get<ConceptoFactura[]>(this.apiUrl);
  }

  obtenerPorId(id: number): Observable<ConceptoFactura> {
    return this.http.get<ConceptoFactura>(`${this.apiUrl}/${id}`).pipe(
      catchError(error => {
        if (error.status === 404) return throwError(() => 'Concepto no encontrado');
        return throwError(() => 'Error al obtener concepto');
      })
    );
  }

  crear(concepto: ConceptoFactura): Observable<boolean> {
    return this.http.post<boolean>(this.apiUrl, concepto);
  }

  actualizar(id: number, concepto: ConceptoFactura): Observable<boolean> {
    return this.http.put<boolean>(`${this.apiUrl}/${id}`, concepto);
  }

  eliminar(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.apiUrl}/${id}`);
  }

  obtenerPorFactura(idFactura: number): Observable<ConceptoFactura[]> {
    return this.http.get<ConceptoFactura[]>(`${this.apiUrl}/factura/${idFactura}`);
  }
}