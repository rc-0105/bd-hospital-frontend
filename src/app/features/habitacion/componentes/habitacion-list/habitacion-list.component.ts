import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HabitacionService } from '../../services/habitacion.service';
import { Habitacion } from '../../models/habitacion.model';
 
@Component({
  selector: 'app-habitacion-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './habitacion-list.component.html',
  styleUrls: ['./habitacion-list.component.css']
})
export class HabitacionListComponent implements OnInit {
  habitaciones: Habitacion[] = [];
  estados = ['DISPONIBLE', 'OCUPADA', 'MANTENIMIENTO'];
  estadoFiltro = '';

  constructor(private habitacionService: HabitacionService) {}

  ngOnInit(): void {
    this.loadHabitaciones();
  }

  loadHabitaciones() {
    this.habitacionService.obtenerTodos().subscribe({
      next: (data) => this.habitaciones = data,
      error: (err) => console.error('Error cargando habitaciones:', err)
    });
  }

  filtrarPorEstado() {
    if (this.estadoFiltro) {
      this.habitaciones = this.habitaciones.filter(h => h.estado === this.estadoFiltro);
    } else {
      this.loadHabitaciones();
    }
  }

  eliminarHabitacion(id: number) {
    if (confirm('¿Estás seguro de eliminar esta habitación?')) {
      this.habitacionService.eliminar(id).subscribe({
        next: () => this.loadHabitaciones(),
        error: (err) => console.error('Error eliminando habitación:', err)
      });
    }
  }
}