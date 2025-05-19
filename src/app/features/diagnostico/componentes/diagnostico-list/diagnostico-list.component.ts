import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DiagnosticoService } from '../../services/diagnostico.service';
import { Diagnostico } from '../../models/diagnostico.model';
import { TruncatePipe } from '../../../../pipes/truncate.pipe';
 

@Component({
  selector: 'app-diagnostico-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule,TruncatePipe],
  templateUrl: './diagnostico-list.component.html',
  styleUrls: ['./diagnostico-list.component.css']
})
export class DiagnosticoListComponent implements OnInit {
  diagnosticos: Diagnostico[] = [];
  searchText: string = '';

  constructor(private diagnosticoService: DiagnosticoService) {}

  ngOnInit(): void {
    this.loadDiagnosticos();
  }

  loadDiagnosticos() {
    this.diagnosticoService.obtenerTodos().subscribe({
      next: (data) => this.diagnosticos = data,
      error: (err) => console.error('Error cargando diagnósticos:', err)
    });
  }

  eliminarDiagnostico(id: number) {
    if (confirm('¿Estás seguro de eliminar este diagnóstico?')) {
      this.diagnosticoService.eliminar(id).subscribe({
        next: () => this.loadDiagnosticos(),
        error: (err) => console.error('Error eliminando diagnóstico:', err)
      });
    }
  }
}