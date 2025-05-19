import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Factura } from '../../models/factura.model';
import { FacturaService } from '../../services/factura.service';
import { ReplaceUnderscorePipe } from '../../../../pipes/replaceUnderscore.pipe';
 

@Component({
  selector: 'app-factura-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, ReplaceUnderscorePipe],
  templateUrl: './factura-detail.component.html',
  styleUrls: ['./factura-detail.component.css']
})
export class FacturaDetailComponent implements OnInit {
  factura?: Factura;

  constructor(
    private route: ActivatedRoute,
    private facturaService: FacturaService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.facturaService.obtenerPorId(+id).subscribe({
        next: (data) => this.factura = data,
        error: () => this.factura = undefined
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