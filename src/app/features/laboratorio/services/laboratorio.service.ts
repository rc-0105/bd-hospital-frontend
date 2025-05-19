import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Laboratorio } from '../models/laboratorio.model';

@Injectable({
  providedIn: 'root'
})
export class LaboratorioService {
  private apiUrl = 'http://localhost:8080/laboratorio';

  constructor(private http: HttpClient) { }

  obtenerTodos(): Observable<Laboratorio[]> {
    return this.http.get<Laboratorio[]>(this.apiUrl);
  }

  obtenerPorId(id: number): Observable<Laboratorio> {
    return this.http.get<Laboratorio>(`${this.apiUrl}/${id}`).pipe(
      catchError(error => {
        if (error.status === 404) return throwError(() => 'Examen no encontrado');
        return throwError(() => 'Error al obtener examen de laboratorio');
      })
    );
  }

  crear(laboratorio: Laboratorio): Observable<boolean> {
    return this.http.post<boolean>(this.apiUrl, laboratorio);
  }

  actualizar(id: number, laboratorio: Laboratorio): Observable<boolean> {
    return this.http.put<boolean>(`${this.apiUrl}/${id}`, laboratorio);
  }

  eliminar(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.apiUrl}/${id}`);
  }

  obtenerPorConsulta(idConsulta: number): Observable<Laboratorio[]> {
    return this.http.get<Laboratorio[]>(`${this.apiUrl}/consulta/${idConsulta}`);
  }
}