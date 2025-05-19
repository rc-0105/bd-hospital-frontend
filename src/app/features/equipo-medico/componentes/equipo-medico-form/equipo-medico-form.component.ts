import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { EquipoMedicoService } from '../../services/equipo-medico.service';
import { EquipoMedico } from '../../models/equipo-medico.model';
 

@Component({
  selector: 'app-equipo-medico-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './equipo-medico-form.component.html',
  styleUrls: ['./equipo-medico-form.component.css']
})
export class EquipoMedicoFormComponent implements OnInit {
  equipo: EquipoMedico = {} as EquipoMedico;
  isEdit = false;
  estados = ['OPERATIVO', 'MANTENIMIENTO', 'DESUSO'];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private equipoService: EquipoMedicoService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.equipoService.obtenerPorId(+id).subscribe({
        next: (data) => this.equipo = data,
        error: () => this.router.navigate(['/equipo-medico'])
      });
    }
  }

  guardar() {
    const operacion = this.isEdit 
      ? this.equipoService.actualizar(this.equipo.id_equipo_medico, this.equipo)
      : this.equipoService.crear(this.equipo);

    operacion.subscribe({
      next: () => this.router.navigate(['/equipo-medico']),
      error: (err) => console.error('Error guardando equipo:', err)
    });
  }
  cancelar() {
    this.router.navigate(['/equipo-medico']);
  }
}