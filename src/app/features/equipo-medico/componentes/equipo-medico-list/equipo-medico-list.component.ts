import { Component, OnInit } from '@angular/core';
import { EquipoMedicoService } from '../../services/equipo-medico.service';
import { EquipoMedico } from '../../models/equipo-medico.model';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-equipo-medico-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './equipo-medico-list.component.html',
  styleUrls: ['./equipo-medico-list.component.css']
})
export class EquipoMedicoListComponent implements OnInit {
  equipos: EquipoMedico[] = [];
  estados = ['OPERATIVO', 'MANTENIMIENTO', 'DESUSO'];
  estadoFiltro = '';

  constructor(private equipoService: EquipoMedicoService) {}

  ngOnInit(): void {
    this.loadEquipos();
  }

  loadEquipos() {
    this.equipoService.obtenerTodos().subscribe({
      next: (data) => this.equipos = data,
      error: (err) => console.error('Error cargando equipos:', err)
    });
  }

  filtrarPorEstado() {
    if (this.estadoFiltro) {
      this.equipos = this.equipos.filter(e => e.estado === this.estadoFiltro);
    } else {
      this.loadEquipos();
    }
  }

  eliminarEquipo(id: number) {
    if (confirm('¿Estás seguro de eliminar este equipo médico?')) {
      this.equipoService.eliminar(id).subscribe({
        next: () => this.loadEquipos(),
        error: (err) => console.error('Error eliminando equipo:', err)
      });
    }
  }
}