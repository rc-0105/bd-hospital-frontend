import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { catchError, forkJoin, of, switchMap } from 'rxjs';

import { PacienteService } from '../../services/paciente.service';
import { Paciente } from '../../models/paciente.model';
import { HistoriaClinicaService } from '../../../historia-clinica/services/historia-clinica.service';
import { HistoriaClinica } from '../../../historia-clinica/models/historia-clinica.model';
import { AntecedenteService } from '../../../antecedente/services/antecedente.service';
import { Antecedente } from '../../../antecedente/models/antecedente.model';
import { AlergiaService } from '../../../alergia/services/alergia.service';
import { Alergia } from '../../../alergia/models/alergia.model';
import { DiagnosticoService } from '../../../diagnostico/services/diagnostico.service';
import { Diagnostico } from '../../../diagnostico/models/diagnostico.model';
import { CitaService } from '../../../cita/services/cita.service';
import { Cita } from '../../../cita/models/cita.model';

@Component({
  selector: 'app-paciente-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './paciente-detail.component.html',
  styleUrls: ['./paciente-detail.component.css']
})
export class PacienteDetailComponent implements OnInit {
  paciente?: Paciente;
  historias: HistoriaClinica[] = [];
  antecedentes: Antecedente[] = [];
  alergias: Alergia[] = [];
  diagnosticos: Diagnostico[] = [];
  citas: Cita[] = [];

  cargandoClinico = true;

  constructor(
    private route: ActivatedRoute,
    private pacienteService: PacienteService,
    private historiaClinicaService: HistoriaClinicaService,
    private antecedenteService: AntecedenteService,
    private alergiaService: AlergiaService,
    private diagnosticoService: DiagnosticoService,
    private citaService: CitaService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (!id) return;

    this.pacienteService.obtenerPorId(id).subscribe({
      next: (data) => (this.paciente = data),
      error: () => (this.paciente = undefined)
    });

    this.historiaClinicaService.obtenerPorPaciente(id).pipe(
      catchError(() => of([] as HistoriaClinica[])),
      switchMap(historias => {
        this.historias = historias;
        if (!historias.length) {
          return of([[] as Antecedente[][], [] as Alergia[][]] as const);
        }
        const antecedentes$ = forkJoin(
          historias.map(h =>
            this.antecedenteService.obtenerPorHistoria(h.id_historia).pipe(catchError(() => of([] as Antecedente[])))
          )
        );
        const alergias$ = forkJoin(
          historias.map(h =>
            this.alergiaService.obtenerPorHistoria(h.id_historia).pipe(catchError(() => of([] as Alergia[])))
          )
        );
        return forkJoin([antecedentes$, alergias$]);
      })
    ).subscribe(([antecedentesPorHistoria, alergiasPorHistoria]) => {
      this.antecedentes = antecedentesPorHistoria.flat();
      this.alergias = alergiasPorHistoria.flat();
      this.cargandoClinico = false;
    });

    this.diagnosticoService.obtenerTodos().pipe(
      catchError(() => of([] as Diagnostico[]))
    ).subscribe(todos => {
      this.diagnosticos = todos.filter(d => d.id_paciente === id);
    });

    this.citaService.obtenerPorPaciente(id).pipe(
      catchError(() => of([] as Cita[]))
    ).subscribe(citas => {
      this.citas = citas.slice().sort((a, b) => b.fecha_hora_cita.localeCompare(a.fecha_hora_cita));
    });
  }

  get edad(): number | null {
    if (!this.paciente?.fecha_nacimiento) return null;
    const nacimiento = new Date(this.paciente.fecha_nacimiento);
    if (isNaN(nacimiento.getTime())) return null;
    const hoy = new Date();
    let edad = hoy.getFullYear() - nacimiento.getFullYear();
    const aunNoCumple =
      hoy.getMonth() < nacimiento.getMonth() ||
      (hoy.getMonth() === nacimiento.getMonth() && hoy.getDate() < nacimiento.getDate());
    if (aunNoCumple) edad--;
    return edad;
  }
}
