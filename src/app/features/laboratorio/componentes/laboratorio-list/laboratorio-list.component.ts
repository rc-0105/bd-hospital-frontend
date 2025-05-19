import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LaboratorioService } from '../../services/laboratorio.service';
import { Laboratorio } from '../../models/laboratorio.model';
import { TruncatePipe } from '../../../../pipes/truncate.pipe';
 

@Component({
  selector: 'app-laboratorio-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule,TruncatePipe],
  templateUrl: './laboratorio-list.component.html',
  styleUrls: ['./laboratorio-list.component.css']
})
export class LaboratorioListComponent implements OnInit {
  examenes: Laboratorio[] = [];
  tiposExamen = ['HEMATOLOGÍA', 'BIOQUÍMICA', 'MICROBIOLOGÍA', 'INMUNOLOGÍA', 'GENÉTICA', 'OTRO'];
  idConsultaBusqueda?: number;
  filtroTipo = '';
  filtroResultado = '';

  constructor(private laboratorioService: LaboratorioService) {}

  ngOnInit(): void {
    this.cargarExamenes();
  }

  cargarExamenes() {
    this.laboratorioService.obtenerTodos().subscribe({
      next: (data) => this.examenes = data,
      error: (err) => console.error('Error cargando exámenes:', err)
    });
  }

  buscarPorConsulta() {
    if (this.idConsultaBusqueda) {
      this.laboratorioService.obtenerPorConsulta(this.idConsultaBusqueda).subscribe({
        next: (data) => this.examenes = data,
        error: (err) => console.error('Error buscando por consulta:', err)
      });
    }
  }

  aplicarFiltros() {
    return this.examenes.filter(examen => {
      const cumpleTipo = !this.filtroTipo || examen.tipo_examen === this.filtroTipo;
      const cumpleResultado = !this.filtroResultado || 
        examen.resultado.toLowerCase().includes(this.filtroResultado.toLowerCase());
      return cumpleTipo && cumpleResultado;
    });
  }

  eliminarExamen(id: number) {
    if (confirm('¿Estás seguro de eliminar este examen de laboratorio?')) {
      this.laboratorioService.eliminar(id).subscribe({
        next: () => this.cargarExamenes(),
        error: (err) => console.error('Error eliminando examen:', err)
      });
    }
  }

  getResultadoClass(resultado: string): string {
    if (!resultado) return 'secondary';
    if (resultado.toLowerCase().includes('normal')) return 'success';
    if (resultado.toLowerCase().includes('anormal')) return 'danger';
    return 'info';
  }
}