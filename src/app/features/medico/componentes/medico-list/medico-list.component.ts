import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MedicoService } from '../../services/medico.service';
import { Medico } from '../../models/medico.model';


@Component({
  selector: 'app-medico-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './medico-list.component.html',
  styleUrls: ['./medico-list.component.css']
})
export class MedicoListComponent implements OnInit {
  medicos: Medico[] = [];

  constructor(private medicoService: MedicoService) {}

  ngOnInit(): void {
    this.loadMedicos();
  }

  loadMedicos() {
    this.medicoService.obtenerTodos().subscribe({
      next: (data) => this.medicos = data,
      error: (err) => console.error('Error cargando médicos:', err)
    });
  }

  eliminarMedico(id: number) {
    if (confirm('¿Estás seguro de eliminar este médico?')) {
      this.medicoService.eliminar(id).subscribe({
        next: () => this.loadMedicos(),
        error: (err) => console.error('Error eliminando médico:', err)
      });
    }
  }
}