import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ConceptoFacturaService } from '../../services/concepto-factura.service';
import { ConceptoFactura } from '../../models/concepto-factura.model';
 

@Component({
  selector: 'app-concepto-factura-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './concepto-factura-form.component.html',
  styleUrls: ['./concepto-factura-form.component.css']
})
export class ConceptoFacturaFormComponent implements OnInit {
  concepto: ConceptoFactura = {
    id_concepto: 0,
    id_factura: 0,
    descripcion: '',
    precio_unitario: 0,
    concepto: ''
  };
  isEdit = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private conceptoService: ConceptoFacturaService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.conceptoService.obtenerPorId(+id).subscribe({
        next: (data) => this.concepto = data,
        error: () => this.router.navigate(['/concepto-factura'])
      });
    }
  }

  guardar() {
    const operacion = this.isEdit 
      ? this.conceptoService.actualizar(this.concepto.id_concepto, this.concepto)
      : this.conceptoService.crear(this.concepto);

    operacion.subscribe({
      next: () => this.router.navigate(['/concepto-factura']),
      error: (err) => console.error('Error guardando concepto:', err)
    });
  }
  cancelar() {
    this.router.navigate(['/concepto-factura']);
  }
}