import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { TipoReclamoService } from '../../services/tipo-reclamo.service';
 
import { ReplaceUnderscorePipe } from '../../../../pipes/replaceUnderscore.pipe';
import { TipoReclamo } from '../../models/tipo-reclamo.model';
 

@Component({
  selector: 'app-tipo-reclamo-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, ReplaceUnderscorePipe],
  templateUrl: './tipo-reclamo-form.component.html',
  styleUrls: ['./tipo-reclamo-form.component.css']
})
export class TipoReclamoFormComponent implements OnInit {
  tipoReclamo: TipoReclamo = {
    id_tpreclamo: 0,
    tipo: 'PRODUCTO_DEFECTUOSO'
  };
  isEdit = false;
  tiposComunes = ['PRODUCTO_DEFECTUOSO', 'ATENCION_CLIENTE', 'ENTREGA_TARDIA', 'FACTURACION'];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private tipoReclamoService: TipoReclamoService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.tipoReclamoService.obtenerPorId(+id).subscribe({
        next: (data) => this.tipoReclamo = data,
        error: () => this.router.navigate(['/tipo-reclamo'])
      });
    }
  }

  guardar() {
    const operacion = this.isEdit 
      ? this.tipoReclamoService.actualizar(this.tipoReclamo.id_tpreclamo, this.tipoReclamo)
      : this.tipoReclamoService.crear(this.tipoReclamo);

    operacion.subscribe({
      next: () => this.router.navigate(['/tipo-reclamo']),
      error: (err) => console.error('Error guardando tipo de reclamo:', err)
    });
  }
  cancelar() {
    this.router.navigate(['/tipo-reclamo']);
  }
}