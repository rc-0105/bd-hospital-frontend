import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { PacienteService } from '../../services/paciente.service';
import { Paciente } from '../../models/paciente.model';


@Component({
  selector: 'app-paciente-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './paciente-detail.component.html',
  styleUrls: ['./paciente-detail.component.css']
})
export class PacienteDetailComponent implements OnInit {
  paciente?: Paciente;

  constructor(
    private route: ActivatedRoute,
    private pacienteService: PacienteService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.pacienteService.obtenerPorId(+id).subscribe({
        next: (data) => this.paciente = data,
        error: () => this.paciente = undefined
      });
    }
  }
}