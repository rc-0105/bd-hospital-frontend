import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HistoriaClinicaService } from '../../services/historia-clinica.service';
import { HistoriaClinica } from '../../models/historia-clinica.model';
import { TruncatePipe } from '../../../../pipes/truncate.pipe';
 
@Component({
  selector: 'app-historia-clinica-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule,TruncatePipe],
  templateUrl: './historia-clinica-list.component.html',
  styleUrls: ['./historia-clinica-list.component.css']
})
export class HistoriaClinicaListComponent implements OnInit {
  historias: HistoriaClinica[] = [];
  idPacienteBusqueda?: number;

  constructor(private historiaService: HistoriaClinicaService) {}

  ngOnInit(): void {
    this.loadHistorias();
  }

  loadHistorias() {
    this.historiaService.obtenerTodos().subscribe({
      next: (data) => this.historias = data,
      error: (err) => console.error('Error cargando historias:', err)
    });
  }

  buscarPorPaciente() {
    if (this.idPacienteBusqueda) {
      this.historiaService.obtenerPorPaciente(this.idPacienteBusqueda).subscribe({
        next: (data) => this.historias = data,
        error: (err) => console.error('Error buscando por paciente:', err)
      });
    }
  }

  eliminarHistoria(id: number) {
    if (confirm('¿Estás seguro de eliminar esta historia clínica?')) {
      this.historiaService.eliminar(id).subscribe({
        next: () => this.loadHistorias(),
        error: (err) => console.error('Error eliminando historia:', err)
      });
    }
  }
}