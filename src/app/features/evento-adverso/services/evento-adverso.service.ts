import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { EventoAdverso } from '../models/evento-adverso.model';

@Injectable({
  providedIn: 'root'
})
export class EventoAdversoService {
  private apiUrl = 'http://localhost:8080/evento_adverso';

  constructor(private http: HttpClient) { }

  obtenerTodos(): Observable<EventoAdverso[]> {
    return this.http.get<EventoAdverso[]>(this.apiUrl);
  }

  obtenerPorId(id: number): Observable<EventoAdverso> {
    return this.http.get<EventoAdverso>(`${this.apiUrl}/${id}`).pipe(
      catchError(error => {
        if (error.status === 404) return throwError(() => 'Evento no encontrado');
        return throwError(() => 'Error al obtener evento');
      })
    );
  }

  crear(evento: EventoAdverso): Observable<boolean> {
    return this.http.post<boolean>(this.apiUrl, evento);
  }

  actualizar(id: number, evento: EventoAdverso): Observable<boolean> {
    return this.http.put<boolean>(`${this.apiUrl}/${id}`, evento);
  }

  eliminar(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.apiUrl}/${id}`);
  }
}