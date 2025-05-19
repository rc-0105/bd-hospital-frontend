import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { LaboratorioService } from '../../services/laboratorio.service';
import { Laboratorio } from '../../models/laboratorio.model';
 

@Component({
  selector: 'app-laboratorio-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './laboratorio-form.component.html',
  styleUrls: ['./laboratorio-form.component.css']
})
export class LaboratorioFormComponent implements OnInit {
  examen: Laboratorio = {
    id_laboratorio: 0,
    id_consulta: 0,
    tipo_examen: 'HEMATOLOGÍA',
    fecha_hora_solicitud: new Date().toISOString(),
    resultado: '',
    observaciones: ''
  };
  isEdit = false;
  tiposExamen = ['HEMATOLOGÍA', 'BIOQUÍMICA', 'MICROBIOLOGÍA', 'INMUNOLOGÍA', 'GENÉTICA', 'OTRO'];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private laboratorioService: LaboratorioService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.laboratorioService.obtenerPorId(+id).subscribe({
        next: (data) => this.examen = data,
        error: () => this.router.navigate(['/laboratorio'])
      });
    }
  }

  guardar() {
    const operacion = this.isEdit 
      ? this.laboratorioService.actualizar(this.examen.id_laboratorio, this.examen)
      : this.laboratorioService.crear(this.examen);

    operacion.subscribe({
      next: () => this.router.navigate(['/laboratorio']),
      error: (err) => console.error('Error guardando examen:', err)
    });
  }
  cancelar() {
    this.router.navigate(['/laboratorio']);
  }
}