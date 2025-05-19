import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FacturaService } from '../../services/factura.service';
import { Factura } from '../../models/factura.model';
import { ReplaceUnderscorePipe } from '../../../../pipes/replaceUnderscore.pipe';
 

@Component({
  selector: 'app-factura-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule,ReplaceUnderscorePipe],
  templateUrl: './factura-list.component.html',
  styleUrls: ['./factura-list.component.css']
})
export class FacturaListComponent implements OnInit {
  facturas: Factura[] = [];
  metodosPago = ['EFECTIVO', 'TARJETA', 'TRANSFERENCIA', 'SEGURO'];
  estados = ['PENDIENTE', 'PAGADA', 'ANULADA', 'EN_PROTESTO'];
  idPacienteBusqueda?: number;
  filtros: any = {};

  constructor(private facturaService: FacturaService) {}

  ngOnInit(): void {
    this.cargarFacturas();
  }

  cargarFacturas() {
    this.facturaService.obtenerTodos().subscribe({
      next: (data) => this.facturas = data,
      error: (err) => console.error('Error cargando facturas:', err)
    });
  }

  buscarPorPaciente() {
    if (this.idPacienteBusqueda) {
      this.facturaService.obtenerPorPaciente(this.idPacienteBusqueda).subscribe({
        next: (data) => this.facturas = data,
        error: (err) => console.error('Error buscando por paciente:', err)
      });
    }
  }

  aplicarFiltros() {
    return this.facturas.filter(factura => {
      return Object.keys(this.filtros).every(key => {
        if (!this.filtros[key]) return true;
        return factura[key as keyof Factura] == this.filtros[key];
      });
    });
  }

  eliminarFactura(id: number) {
    if (confirm('¿Estás seguro de eliminar esta factura?')) {
      this.facturaService.eliminar(id).subscribe({
        next: () => this.cargarFacturas(),
        error: (err) => console.error('Error eliminando factura:', err)
      });
    }
  }

  getEstadoClass(estado: string): string {
    switch (estado) {
      case 'PAGADA': return 'success';
      case 'PENDIENTE': return 'warning';
      case 'ANULADA': return 'danger';
      default: return 'secondary';
    }
  }
}