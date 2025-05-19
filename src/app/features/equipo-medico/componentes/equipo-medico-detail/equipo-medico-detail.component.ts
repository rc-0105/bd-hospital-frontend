import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { EquipoMedicoService } from '../../services/equipo-medico.service';
import { EquipoMedico } from '../../models/equipo-medico.model';
 

@Component({
  selector: 'app-equipo-medico-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './equipo-medico-detail.component.html',
  styleUrls: ['./equipo-medico-detail.component.css']
})
export class EquipoMedicoDetailComponent implements OnInit {
  equipo?: EquipoMedico;

  constructor(
    private route: ActivatedRoute,
    private equipoService: EquipoMedicoService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.equipoService.obtenerPorId(+id).subscribe({
        next: (data) => this.equipo = data,
        error: () => this.equipo = undefined
      });
    }
  }
}