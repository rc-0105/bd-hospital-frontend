import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Reclamo } from '../../models/reclamo.model';
import { ReclamoService } from '../../services/reclamo.service';
 

@Component({
  selector: 'app-reclamo-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './reclamo-form.component.html',
  styleUrls: ['./reclamo-form.component.css']
})
export class ReclamoFormComponent implements OnInit {
  reclamo: Reclamo = {
    id_reclamo: 0,
    fecha_hora_reclamo: new Date().toISOString(),
    descripcion: '',
    area_responsable: '',
    estado: 'PENDIENTE',
    tipo: 'ATENCION',
    id_paciente: 0
  };
  isEdit = false;
  estados = ['PENDIENTE', 'EN_PROCESO', 'RESUELTO', 'RECHAZADO'];
  tipos = ['ATENCION', 'HIGIENE', 'INFRAESTRUCTURA', 'OTRO'];
  areas = ['ADMINISTRACION', 'ENFERMERIA', 'LIMPIEZA', 'MANTENIMIENTO', 'MEDICINA'];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private reclamoService: ReclamoService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.reclamoService.obtenerPorId(+id).subscribe({
        next: (data) => this.reclamo = data,
        error: () => this.router.navigate(['/reclamo'])
      });
    }
  }

  guardar() {
    const operacion = this.isEdit 
      ? this.reclamoService.actualizar(this.reclamo.id_reclamo, this.reclamo)
      : this.reclamoService.crear(this.reclamo);

    operacion.subscribe({
      next: () => this.router.navigate(['/reclamo']),
      error: (err) => console.error('Error guardando reclamo:', err)
    });
  }
  cancelar() {
    this.router.navigate(['/reclamo']);
  }
}