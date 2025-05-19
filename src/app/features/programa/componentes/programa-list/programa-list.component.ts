import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProgramaService } from '../../services/programa.service';
import { Programa } from '../../models/programa.model';
 

@Component({
  selector: 'app-programa-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './programa-list.component.html',
  styleUrls: ['./programa-list.component.css']
})
export class ProgramaListComponent implements OnInit {
  programas: Programa[] = [];
  estados = ['ACTIVO', 'INACTIVO', 'FINALIZADO', 'PENDIENTE'];
  filtros: any = {};

  constructor(private programaService: ProgramaService) {}

  ngOnInit(): void {
    this.cargarProgramas();
  }

  cargarProgramas() {
    this.programaService.obtenerTodos().subscribe({
      next: (data) => this.programas = data,
      error: (err) => console.error('Error cargando programas:', err)
    });
  }

  aplicarFiltros() {
    return this.programas.filter(programa => {
      return Object.keys(this.filtros).every(key => {
        if (!this.filtros[key]) return true;
        
        if (key === 'fecha_inicio' || key === 'fecha_fin') {
          const fechaPrograma = new Date(programa[key as keyof Programa] as string);
          const fechaFiltro = new Date(this.filtros[key]);
          return fechaPrograma.toDateString() === fechaFiltro.toDateString();
        }
        
        return programa[key as keyof Programa] === this.filtros[key];
      });
    });
  }

  eliminarPrograma(id: number) {
    if (confirm('¿Estás seguro de eliminar este programa?')) {
      this.programaService.eliminar(id).subscribe({
        next: () => this.cargarProgramas(),
        error: (err) => console.error('Error eliminando programa:', err)
      });
    }
  }

  getEstadoClass(estado: string): string {
    switch (estado) {
      case 'ACTIVO': return 'success';
      case 'INACTIVO': return 'warning';
      case 'FINALIZADO': return 'secondary';
      case 'PENDIENTE': return 'info';
      default: return 'light';
    }
  }
}