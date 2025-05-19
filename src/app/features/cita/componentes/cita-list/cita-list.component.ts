import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CitaService } from '../../services/cita.service';
import { Cita } from '../../models/cita.model';
 

@Component({
  selector: 'app-cita-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './cita-list.component.html',
  styleUrls: ['./cita-list.component.css']
})
export class CitaListComponent implements OnInit {
  citas: Cita[] = [];
  estados = ['PENDIENTE', 'CONFIRMADA', 'COMPLETADA', 'CANCELADA'];
  filtros = {
    idPaciente: '',
    idMedico: '',
    estado: '',
    fechaDesde: '',
    fechaHasta: ''
  };

  constructor(private citaService: CitaService) {}

  ngOnInit(): void {
    this.cargarCitas();
  }

  cargarCitas() {
    this.citaService.obtenerTodas().subscribe({
      next: (data) => this.citas = data,
      error: (err) => console.error('Error cargando citas:', err)
    });
  }

  aplicarFiltros() {
    if (this.filtros.idPaciente) {
      this.citaService.obtenerPorPaciente(+this.filtros.idPaciente).subscribe({
        next: (data) => this.citas = data,
        error: (err) => console.error('Error filtrando por paciente:', err)
      });
    } else if (this.filtros.idMedico) {
      this.citaService.obtenerPorMedico(+this.filtros.idMedico).subscribe({
        next: (data) => this.citas = data,
        error: (err) => console.error('Error filtrando por médico:', err)
      });
    } else if (this.filtros.estado) {
      this.citaService.obtenerPorEstado(this.filtros.estado).subscribe({
        next: (data) => this.citas = data,
        error: (err) => console.error('Error filtrando por estado:', err)
      });
    } else {
      this.cargarCitas();
    }
  }

  limpiarFiltros() {
    this.filtros = {
      idPaciente: '',
      idMedico: '',
      estado: '',
      fechaDesde: '',
      fechaHasta: ''
    };
    this.cargarCitas();
  }

  eliminarCita(id: number) {
    if (confirm('¿Estás seguro de eliminar esta cita?')) {
      this.citaService.eliminar(id).subscribe({
        next: () => this.cargarCitas(),
        error: (err) => console.error('Error eliminando cita:', err)
      });
    }
  }

  formatearFecha(fecha: string): string {
    return new Date(fecha).toLocaleString();
  }
}