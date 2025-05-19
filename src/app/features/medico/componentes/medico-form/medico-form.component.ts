import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MedicoService } from '../../services/medico.service';
import { Medico } from '../../models/medico.model';
 

@Component({
  selector: 'app-medico-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './medico-form.component.html',
  styleUrls: ['./medico-form.component.css']
})
export class MedicoFormComponent implements OnInit {
  medico: Medico = {} as Medico;
  isEdit = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private medicoService: MedicoService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.medicoService.obtenerPorId(+id).subscribe({
        next: (data) => this.medico = data,
        error: () => this.router.navigate(['/medicos'])
      });
    }
  }

  guardar() {
    const operacion = this.isEdit 
      ? this.medicoService.actualizar(this.medico.id_medico, this.medico)
      : this.medicoService.crear(this.medico);

    operacion.subscribe({
      next: () => this.router.navigate(['/medicos']),
      error: (err) => console.error('Error guardando médico:', err)
    });
  }
  cancelar() {
    this.router.navigate(['/medicos']);
  }
}