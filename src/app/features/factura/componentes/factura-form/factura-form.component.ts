import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Factura } from '../../models/factura.model';
import { FacturaService } from '../../services/factura.service';
import { ReplaceUnderscorePipe } from '../../../../pipes/replaceUnderscore.pipe';
 

@Component({
  selector: 'app-factura-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, ReplaceUnderscorePipe],
  templateUrl: './factura-form.component.html',
  styleUrls: ['./factura-form.component.css']
})
export class FacturaFormComponent implements OnInit {
  factura: Factura = {
    id_factura: 0,
    id_paciente: 0,
    fecha_hora_emision: new Date().toISOString(),
    total: 0,
    metodo_pago: 'EFECTIVO',
    estado: 'PENDIENTE',
    id_tipo: 0,
    id_concepto: 0
  };
  isEdit = false;
  metodosPago = ['EFECTIVO', 'TARJETA', 'TRANSFERENCIA', 'SEGURO'];
  estados = ['PENDIENTE', 'PAGADA', 'ANULADA', 'EN_PROTESTO'];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private facturaService: FacturaService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.facturaService.obtenerPorId(+id).subscribe({
        next: (data) => this.factura = data,
        error: () => this.router.navigate(['/factura'])
      });
    }
  }

  guardar() {
    const operacion = this.isEdit 
      ? this.facturaService.actualizar(this.factura.id_factura, this.factura)
      : this.facturaService.crear(this.factura);

    operacion.subscribe({
      next: () => this.router.navigate(['/factura']),
      error: (err) => console.error('Error guardando factura:', err)
    });
  }
  cancelar() {
    this.router.navigate(['/factura']);
  }
  
}