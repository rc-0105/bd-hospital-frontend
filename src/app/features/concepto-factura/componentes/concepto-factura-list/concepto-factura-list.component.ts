import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ConceptoFacturaService } from '../../services/concepto-factura.service';
import { ConceptoFactura } from '../../models/concepto-factura.model';
 

@Component({
  selector: 'app-concepto-factura-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './concepto-factura-list.component.html',
  styleUrls: ['./concepto-factura-list.component.css']
})
export class ConceptoFacturaListComponent implements OnInit {
  conceptos: ConceptoFactura[] = [];
  idFacturaBusqueda?: number;
  total = 0;

  constructor(private conceptoService: ConceptoFacturaService) {}

  ngOnInit(): void {
    this.loadConceptos();
  }

  loadConceptos() {
    this.conceptoService.obtenerTodos().subscribe({
      next: (data) => {
        this.conceptos = data;
        this.calcularTotal();
      },
      error: (err) => console.error('Error cargando conceptos:', err)
    });
  }

  buscarPorFactura() {
    if (this.idFacturaBusqueda) {
      this.conceptoService.obtenerPorFactura(this.idFacturaBusqueda).subscribe({
        next: (data) => {
          this.conceptos = data;
          this.calcularTotal();
        },
        error: (err) => console.error('Error buscando por factura:', err)
      });
    }
  }

  calcularTotal() {
    this.total = this.conceptos.reduce((sum, concepto) => sum + concepto.precio_unitario, 0);
  }

  eliminarConcepto(id: number) {
    if (confirm('¿Estás seguro de eliminar este concepto?')) {
      this.conceptoService.eliminar(id).subscribe({
        next: () => this.loadConceptos(),
        error: (err) => console.error('Error eliminando concepto:', err)
      });
    }
  }
}