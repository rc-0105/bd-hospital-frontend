import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Paciente } from '../../models/paciente.model';
import { PacienteService } from '../../services/paciente.service';
import { FormsModule } from '@angular/forms';



@Component({
  selector: 'app-paciente-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './paciente-list.component.html',
  styleUrls: ['./paciente-list.component.css']
})
export class PacienteListComponent implements OnInit {
  pacientes: Paciente[] = [];
  idSeguroBusqueda?: number;

  constructor(private pacienteService: PacienteService) {}

  ngOnInit(): void {
    this.pacienteService.pacientes$.subscribe(pacientes => {
      this.pacientes = pacientes;
    });
    
    if (!this.pacientes.length) {
      this.loadPacientes();
    }
  }

  loadPacientes() {
    this.pacienteService.obtenerTodos().subscribe({
      next: (data) => this.pacientes = data,
      error: (err) => console.error('Error cargando pacientes:', err)
    });
  }

  buscarPorSeguro() {
    if (this.idSeguroBusqueda) {
      this.pacienteService.obtenerPorSeguro(this.idSeguroBusqueda).subscribe({
        next: (data) => this.pacientes = data,
        error: (err) => console.error('Error buscando por seguro:', err)
      });
    }
  }

  eliminarPaciente(id: number) {
    if (confirm('¿Estás seguro de eliminar este paciente?')) {
      this.pacienteService.eliminar(id).subscribe({
        next: () => this.loadPacientes(),
        error: (err) => console.error('Error eliminando paciente:', err)
      });
    }
  }
}