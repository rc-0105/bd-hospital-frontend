import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ReclamoService } from '../../services/reclamo.service';
import { Reclamo } from '../../models/reclamo.model';
import { TruncatePipe } from '../../../../pipes/truncate.pipe';
 

@Component({
  selector: 'app-reclamo-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, TruncatePipe],
  templateUrl: './reclamo-list.component.html',
  styleUrls: ['./reclamo-list.component.css']
})
export class ReclamoListComponent implements OnInit {
  reclamos: Reclamo[] = [];
  estados = ['PENDIENTE', 'EN_PROCESO', 'RESUELTO', 'RECHAZADO'];
  tipos = ['ATENCION', 'HIGIENE', 'INFRAESTRUCTURA', 'OTRO'];
  filtroEstado = '';
  filtroTipo = '';

  constructor(private reclamoService: ReclamoService) {}

  ngOnInit(): void {
    this.loadReclamos();
  }

  loadReclamos() {
    this.reclamoService.obtenerTodos().subscribe({
      next: (data) => this.reclamos = data,
      error: (err) => console.error('Error cargando reclamos:', err)
    });
  }

  aplicarFiltros() {
    let filtrados = this.reclamos;
    
    if (this.filtroEstado) {
      filtrados = filtrados.filter(r => r.estado === this.filtroEstado);
    }
    
    if (this.filtroTipo) {
      filtrados = filtrados.filter(r => r.tipo === this.filtroTipo);
    }
    
    return filtrados;
  }

  eliminarReclamo(id: number) {
    if (confirm('¿Estás seguro de eliminar este reclamo?')) {
      this.reclamoService.eliminar(id).subscribe({
        next: () => this.loadReclamos(),
        error: (err) => console.error('Error eliminando reclamo:', err)
      });
    }
  }
}