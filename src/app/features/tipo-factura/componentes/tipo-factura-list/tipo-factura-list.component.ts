import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TipoFacturaService } from '../../services/tipo-factura.service';
import { TipoFactura } from '../../models/tipo-factura.model';
 

@Component({
  selector: 'app-tipo-factura-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './tipo-factura-list.component.html',
  styleUrls: ['./tipo-factura-list.component.css']
})
export class TipoFacturaListComponent implements OnInit {
  tiposFactura: TipoFactura[] = [];
  tiposPredefinidos = ['CONTADO', 'CRÉDITO', 'EXENTA', 'ESPECIAL'];
  filtroTipo = '';

  constructor(private tipoFacturaService: TipoFacturaService) {}

  ngOnInit(): void {
    this.cargarTiposFactura();
  }

  cargarTiposFactura() {
    this.tipoFacturaService.obtenerTodos().subscribe({
      next: (data) => this.tiposFactura = data,
      error: (err) => console.error('Error cargando tipos de factura:', err)
    });
  }

  filtrarTiposFactura() {
    if (!this.filtroTipo) return this.tiposFactura;
    return this.tiposFactura.filter(t => 
      t.tipo.toLowerCase().includes(this.filtroTipo.toLowerCase())
    );
  }

  eliminarTipoFactura(id: number) {
    if (confirm('¿Estás seguro de eliminar este tipo de factura?')) {
      this.tipoFacturaService.eliminar(id).subscribe({
        next: () => this.cargarTiposFactura(),
        error: (err) => console.error('Error eliminando tipo de factura:', err)
      });
    }
  }
}