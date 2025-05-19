import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Cirugia } from '../models/cirugia.model';

@Injectable({
  providedIn: 'root'
})
export class CirugiaService {
  private apiUrl = 'http://localhost:8080/cirugia';

  constructor(private http: HttpClient) { }

  obtenerTodas(): Observable<Cirugia[]> {
    return this.http.get<Cirugia[]>(this.apiUrl);
  }

  obtenerPorId(id: number): Observable<Cirugia> {
    return this.http.get<Cirugia>(`${this.apiUrl}/${id}`).pipe(
      catchError(error => {
        if (error.status === 404) return throwError(() => 'Cirugía no encontrada');
        return throwError(() => 'Error al obtener cirugía');
      })
    );
  }

  obtenerPorPaciente(idPaciente: number): Observable<Cirugia[]> {
    return this.http.get<Cirugia[]>(`${this.apiUrl}/paciente/${idPaciente}`);
  }

  obtenerPorMedico(idMedico: number): Observable<Cirugia[]> {
    return this.http.get<Cirugia[]>(`${this.apiUrl}/medico/${idMedico}`);
  }

  crear(cirugia: Omit<Cirugia, 'id_cirugia' | 'nombre_paciente' | 'apellido_paciente' | 'nombre_medico' | 'apellido_medico'>): Observable<boolean> {
    return this.http.post<boolean>(this.apiUrl, cirugia);
  }

  actualizar(id: number, cirugia: Omit<Cirugia, 'nombre_paciente' | 'apellido_paciente' | 'nombre_medico' | 'apellido_medico'>): Observable<boolean> {
    return this.http.put<boolean>(`${this.apiUrl}/${id}`, cirugia);
  }

  eliminar(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.apiUrl}/${id}`);
  }
}