import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CirugiaService } from '../../services/cirugia.service';
import { Cirugia } from '../../models/cirugia.model';
 

@Component({
  selector: 'app-cirugia-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './cirugia-list.component.html',
  styleUrls: ['./cirugia-list.component.css']
})
export class CirugiaListComponent implements OnInit {
  cirugias: Cirugia[] = [];
  tiposProcedimientos = ['MAYOR', 'MENOR', 'AMBULATORIA', 'URGENTE', 'PROGRAMADA'];
  filtros = {
    idPaciente: '',
    idMedico: '',
    tipoProcedimiento: ''
  };

  constructor(private cirugiaService: CirugiaService) {}

  ngOnInit(): void {
    this.cargarCirugias();
  }

  cargarCirugias() {
    this.cirugiaService.obtenerTodas().subscribe({
      next: (data) => this.cirugias = data,
      error: (err) => console.error('Error cargando cirugías:', err)
    });
  }

  buscarPorPaciente() {
    if (this.filtros.idPaciente) {
      this.cirugiaService.obtenerPorPaciente(+this.filtros.idPaciente).subscribe({
        next: (data) => this.cirugias = data,
        error: (err) => console.error('Error buscando por paciente:', err)
      });
    }
  }

  buscarPorMedico() {
    if (this.filtros.idMedico) {
      this.cirugiaService.obtenerPorMedico(+this.filtros.idMedico).subscribe({
        next: (data) => this.cirugias = data,
        error: (err) => console.error('Error buscando por médico:', err)
      });
    }
  }

  aplicarFiltros() {
    if (this.filtros.tipoProcedimiento) {
      this.cirugias = this.cirugias.filter(c => 
        c.tipo_procedimiento === this.filtros.tipoProcedimiento
      );
    }
  }

  limpiarFiltros() {
    this.filtros = {
      idPaciente: '',
      idMedico: '',
      tipoProcedimiento: ''
    };
    this.cargarCirugias();
  }

  eliminarCirugia(id: number) {
    if (confirm('¿Estás seguro de eliminar esta cirugía?')) {
      this.cirugiaService.eliminar(id).subscribe({
        next: () => this.cargarCirugias(),
        error: (err) => console.error('Error eliminando cirugía:', err)
      });
    }
  }

  formatearFecha(fecha: string): string {
    return new Date(fecha).toLocaleString();
  }
}