import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Poliza } from '../models/poliza.model';

@Injectable({
  providedIn: 'root'
})
export class PolizaService {
  private apiUrl = 'http://localhost:8080/poliza';

  constructor(private http: HttpClient) { }

  obtenerTodos(): Observable<Poliza[]> {
    return this.http.get<Poliza[]>(this.apiUrl);
  }

  obtenerPorId(id: number): Observable<Poliza> {
    return this.http.get<Poliza>(`${this.apiUrl}/${id}`).pipe(
      catchError(error => {
        if (error.status === 404) return throwError(() => 'Póliza no encontrada');
        return throwError(() => 'Error al obtener póliza');
      })
    );
  }

  crear(poliza: Poliza): Observable<boolean> {
    return this.http.post<boolean>(this.apiUrl, poliza);
  }

  actualizar(id: number, poliza: Poliza): Observable<boolean> {
    return this.http.put<boolean>(`${this.apiUrl}/${id}`, poliza);
  }

  eliminar(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.apiUrl}/${id}`);
  }
}