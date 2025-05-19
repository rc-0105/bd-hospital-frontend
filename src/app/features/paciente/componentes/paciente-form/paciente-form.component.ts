import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Paciente } from '../../models/paciente.model';
import { PacienteService } from '../../services/paciente.service';


@Component({
  selector: 'app-paciente-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './paciente-form.component.html',
  styleUrls: ['./paciente-form.component.css']
})
export class PacienteFormComponent implements OnInit {
  paciente: Paciente = {} as Paciente;
  isEdit = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private pacienteService: PacienteService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.pacienteService.obtenerPorId(+id).subscribe({
        next: (data) => this.paciente = data,
        error: () => this.router.navigate(['/pacientes'])
      });
    }
  }

  guardar() {
    const operacion = this.isEdit 
      ? this.pacienteService.actualizar(this.paciente.id_paciente, this.paciente)
      : this.pacienteService.crear(this.paciente);

    operacion.subscribe({
      next: () => this.router.navigate(['/pacientes']),
      error: (err) => console.error('Error guardando paciente:', err)
    });
  }
  public cancelar(): void {
  this.router.navigate(['/pacientes']);
  }
}