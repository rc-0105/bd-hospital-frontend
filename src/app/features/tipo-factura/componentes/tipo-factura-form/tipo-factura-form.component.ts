import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { TipoFactura } from '../../models/tipo-factura.model';
import { TipoFacturaService } from '../../services/tipo-factura.service';
 
@Component({
  selector: 'app-tipo-factura-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './tipo-factura-form.component.html',
  styleUrls: ['./tipo-factura-form.component.css']
})
export class TipoFacturaFormComponent implements OnInit {
  tipoFactura: TipoFactura = {
    id_tipo: 0,
    tipo: 'CONTADO'
  };
  isEdit = false;
  tiposPredefinidos = ['CONTADO', 'CRÉDITO', 'EXENTA', 'ESPECIAL'];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private tipoFacturaService: TipoFacturaService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.tipoFacturaService.obtenerPorId(+id).subscribe({
        next: (data) => this.tipoFactura = data,
        error: () => this.router.navigate(['/tipo-factura'])
      });
    }
  }

  guardar() {
    const operacion = this.isEdit 
      ? this.tipoFacturaService.actualizar(this.tipoFactura.id_tipo, this.tipoFactura)
      : this.tipoFacturaService.crear(this.tipoFactura);

    operacion.subscribe({
      next: () => this.router.navigate(['/tipo-factura']),
      error: (err) => console.error('Error guardando tipo de factura:', err)
    });
  }
  cancelar() {
    this.router.navigate(['/tipo-factura']);
  }
}