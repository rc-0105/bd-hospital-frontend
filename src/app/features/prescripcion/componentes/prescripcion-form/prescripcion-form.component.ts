import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Prescripcion } from '../../models/prescripcion.model';
import { PrescripcionService } from '../../services/prescripcion.service';
 

@Component({
  selector: 'app-prescripcion-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './prescripcion-form.component.html',
  styleUrls: ['./prescripcion-form.component.css']
})
export class PrescripcionFormComponent implements OnInit {
  prescripcion: Prescripcion = {
    id_prescripcion: 0,
    id_consulta: 0,
    fecha_hora: new Date().toISOString(),
    indicaciones_generales: ''
  };
  isEdit = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private prescripcionService: PrescripcionService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.prescripcionService.obtenerPorId(+id).subscribe({
        next: (data) => this.prescripcion = data,
        error: () => this.router.navigate(['/prescripcion'])
      });
    }
  }

  guardar() {
    const operacion = this.isEdit 
      ? this.prescripcionService.actualizar(this.prescripcion.id_prescripcion, this.prescripcion)
      : this.prescripcionService.crear(this.prescripcion);

    operacion.subscribe({
      next: () => this.router.navigate(['/prescripcion']),
      error: (err) => console.error('Error guardando prescripción:', err)
    });
  }
  cancelar() {
    this.router.navigate(['/prescripcion']);
  }
}