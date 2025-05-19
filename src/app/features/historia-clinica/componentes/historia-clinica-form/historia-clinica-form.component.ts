import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { HistoriaClinicaService } from '../../services/historia-clinica.service';
import { HistoriaClinica } from '../../models/historia-clinica.model';
 
@Component({
  selector: 'app-historia-clinica-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './historia-clinica-form.component.html',
  styleUrls: ['./historia-clinica-form.component.css']
})
export class HistoriaClinicaFormComponent implements OnInit {
  historia: HistoriaClinica = {
    id_historia: 0,
    id_paciente: 0,
    fecha_hora_creacion: new Date().toISOString(),
    observaciones: ''
  };
  isEdit = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private historiaService: HistoriaClinicaService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.historiaService.obtenerPorId(+id).subscribe({
        next: (data) => this.historia = data,
        error: () => this.router.navigate(['/historia-clinica'])
      });
    }
  }

  guardar() {
    const operacion = this.isEdit 
      ? this.historiaService.actualizar(this.historia.id_historia, this.historia)
      : this.historiaService.crear(this.historia);

    operacion.subscribe({
      next: () => this.router.navigate(['/historia-clinica']),
      error: (err) => console.error('Error guardando historia:', err)
    });
  }
  cancelar() {
    this.router.navigate(['/historia-clinica']);
  }
}