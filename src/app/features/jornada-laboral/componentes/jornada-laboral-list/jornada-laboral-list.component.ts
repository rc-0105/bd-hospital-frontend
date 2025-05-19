import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { JornadaLaboralService } from '../../services/jornada-laboral.service';
import { JornadaLaboral } from '../../models/jornada-laboral.model';
 

@Component({
  selector: 'app-jornada-laboral-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './jornada-laboral-list.component.html',
  styleUrls: ['./jornada-laboral-list.component.css']
})
export class JornadaLaboralListComponent implements OnInit {
  jornadas: JornadaLaboral[] = [];
  idEmpleadoBusqueda?: number;
  fechaFiltro?: string;

  constructor(private jornadaService: JornadaLaboralService) {}

  ngOnInit(): void {
    this.cargarJornadas();
  }

  cargarJornadas() {
    this.jornadaService.obtenerTodos().subscribe({
      next: (data) => this.jornadas = data,
      error: (err) => console.error('Error cargando jornadas:', err)
    });
  }

  buscarPorEmpleado() {
    if (this.idEmpleadoBusqueda) {
      this.jornadaService.obtenerPorEmpleado(this.idEmpleadoBusqueda).subscribe({
        next: (data) => this.jornadas = data,
        error: (err) => console.error('Error buscando por empleado:', err)
      });
    }
  }

  filtrarPorFecha() {
    if (!this.fechaFiltro) return this.jornadas;
    return this.jornadas.filter(j => 
      j.fecha_hora_inicio.startsWith(this.fechaFiltro!)
    );
  }

  calcularDuracion(jornada: JornadaLaboral): string {
    if (!jornada.fecha_hora_cierre) return 'En curso';
    
    const inicio = new Date(jornada.fecha_hora_inicio);
    const cierre = new Date(jornada.fecha_hora_cierre);
    const diff = cierre.getTime() - inicio.getTime();
    
    const horas = Math.floor(diff / (1000 * 60 * 60));
    const minutos = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    return `${horas}h ${minutos}m`;
  }

  eliminarJornada(id: number) {
    if (confirm('¿Estás seguro de eliminar esta jornada laboral?')) {
      this.jornadaService.eliminar(id).subscribe({
        next: () => this.cargarJornadas(),
        error: (err) => console.error('Error eliminando jornada:', err)
      });
    }
  }
}