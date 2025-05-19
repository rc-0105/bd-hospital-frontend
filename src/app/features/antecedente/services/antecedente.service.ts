import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Antecedente } from '../models/antecedente.model';

@Injectable({
  providedIn: 'root'
})
export class AntecedenteService {
  private apiUrl = 'http://localhost:8080/antecedente';

  constructor(private http: HttpClient) { }

  obtenerTodos(): Observable<Antecedente[]> {
    return this.http.get<Antecedente[]>(this.apiUrl);
  }

  obtenerPorId(id: number): Observable<Antecedente> {
    return this.http.get<Antecedente>(`${this.apiUrl}/${id}`).pipe(
      catchError(error => {
        if (error.status === 404) return throwError(() => 'Antecedente no encontrado');
        return throwError(() => 'Error al obtener antecedente');
      })
    );
  }

  obtenerPorHistoria(idHistoria: number): Observable<Antecedente[]> {
    return this.http.get<Antecedente[]>(`${this.apiUrl}/historia/${idHistoria}`);
  }

  crear(antecedente: Antecedente): Observable<boolean> {
    return this.http.post<boolean>(this.apiUrl, antecedente);
  }

  actualizar(id: number, antecedente: Antecedente): Observable<boolean> {
    return this.http.put<boolean>(`${this.apiUrl}/${id}`, antecedente);
  }

  eliminar(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.apiUrl}/${id}`);
  }
}