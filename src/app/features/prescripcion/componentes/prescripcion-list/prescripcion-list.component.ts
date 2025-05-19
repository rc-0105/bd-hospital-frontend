import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PrescripcionService } from '../../services/prescripcion.service';
import { Prescripcion } from '../../models/prescripcion.model';
import { TruncatePipe } from '../../../../pipes/truncate.pipe';
 

@Component({
  selector: 'app-prescripcion-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule,TruncatePipe],
  templateUrl: './prescripcion-list.component.html',
  styleUrls: ['./prescripcion-list.component.css']
})
export class PrescripcionListComponent implements OnInit {
  prescripciones: Prescripcion[] = [];
  idConsultaBusqueda?: number;
  filtroIndicaciones = '';

  constructor(private prescripcionService: PrescripcionService) {}

  ngOnInit(): void {
    this.cargarPrescripciones();
  }

  cargarPrescripciones() {
    this.prescripcionService.obtenerTodos().subscribe({
      next: (data) => this.prescripciones = data,
      error: (err) => console.error('Error cargando prescripciones:', err)
    });
  }

  buscarPorConsulta() {
    if (this.idConsultaBusqueda) {
      this.prescripcionService.obtenerPorConsulta(this.idConsultaBusqueda).subscribe({
        next: (data) => this.prescripciones = data,
        error: (err) => console.error('Error buscando por consulta:', err)
      });
    }
  }

  filtrarPrescripciones() {
    if (!this.filtroIndicaciones) return this.prescripciones;
    return this.prescripciones.filter(p => 
      p.indicaciones_generales.toLowerCase().includes(this.filtroIndicaciones.toLowerCase())
    );
  }

  eliminarPrescripcion(id: number) {
    if (confirm('¿Estás seguro de eliminar esta prescripción?')) {
      this.prescripcionService.eliminar(id).subscribe({
        next: () => this.cargarPrescripciones(),
        error: (err) => console.error('Error eliminando prescripción:', err)
      });
    }
  }
}