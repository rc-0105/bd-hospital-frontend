import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ConceptoFacturaService } from '../../services/concepto-factura.service';
import { ConceptoFactura } from '../../models/concepto-factura.model';
 
@Component({
  selector: 'app-concepto-factura-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './concepto-factura-detail.component.html',
  styleUrls: ['./concepto-factura-detail.component.css']
})
export class ConceptoFacturaDetailComponent implements OnInit {
  concepto?: ConceptoFactura;

  constructor(
    private route: ActivatedRoute,
    private conceptoService: ConceptoFacturaService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.conceptoService.obtenerPorId(+id).subscribe({
        next: (data) => this.concepto = data,
        error: () => this.concepto = undefined
      });
    }
  }
}