import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { SeguroSalud } from '../models/seguro-salud.model';

@Injectable({
  providedIn: 'root'
})
export class SeguroSaludService {
  private apiUrl = 'http://localhost:8080/seguro-salud';

  constructor(private http: HttpClient) { }

  obtenerTodos(): Observable<SeguroSalud[]> {
    return this.http.get<SeguroSalud[]>(this.apiUrl);
  }

  obtenerPorId(id: number): Observable<SeguroSalud> {
    return this.http.get<SeguroSalud>(`${this.apiUrl}/${id}`).pipe(
      catchError(error => {
        if (error.status === 404) return throwError(() => 'Seguro no encontrado');
        return throwError(() => 'Error al obtener seguro');
      })
    );
  }

  crear(seguro: SeguroSalud): Observable<string> {
    return this.http.post<string>(this.apiUrl, seguro);
  }

  actualizar(id: number, seguro: SeguroSalud): Observable<string> {
    return this.http.put<string>(`${this.apiUrl}/${id}`, seguro);
  }

  eliminar(id: number): Observable<string> {
    return this.http.delete<string>(`${this.apiUrl}/${id}`);
  }
}