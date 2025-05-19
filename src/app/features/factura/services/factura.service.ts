import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Factura } from '../models/factura.model';

@Injectable({
  providedIn: 'root'
})
export class FacturaService {
  private apiUrl = 'http://localhost:8080/factura';

  constructor(private http: HttpClient) { }

  obtenerTodos(): Observable<Factura[]> {
    return this.http.get<Factura[]>(this.apiUrl);
  }

  obtenerPorId(id: number): Observable<Factura> {
    return this.http.get<Factura>(`${this.apiUrl}/${id}`).pipe(
      catchError(error => {
        if (error.status === 404) return throwError(() => 'Factura no encontrada');
        return throwError(() => 'Error al obtener factura');
      })
    );
  }

  crear(factura: Factura): Observable<boolean> {
    return this.http.post<boolean>(this.apiUrl, factura);
  }

  actualizar(id: number, factura: Factura): Observable<boolean> {
    return this.http.put<boolean>(`${this.apiUrl}/${id}`, factura);
  }

  eliminar(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.apiUrl}/${id}`);
  }

  obtenerPorPaciente(idPaciente: number): Observable<Factura[]> {
    return this.http.get<Factura[]>(`${this.apiUrl}/paciente/${idPaciente}`);
  }
}