import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { catchError, of } from 'rxjs';

import { PacienteService } from '../features/paciente/services/paciente.service';
import { MedicoService } from '../features/medico/services/medico.service';
import { CitaService } from '../features/cita/services/cita.service';
import { HabitacionService } from '../features/habitacion/services/habitacion.service';

interface ModuleLink {
  label: string;
  path: string;
  icon: string;
}

interface ModuleGroup {
  label: string;
  icon: string;
  accent: string;
  items: ModuleLink[];
}

interface Stat {
  label: string;
  icon: string;
  accent: string;
  value: number | null;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  stats: Stat[] = [
    { label: 'Pacientes', icon: 'bi-people-fill', accent: '#3366ff', value: null },
    { label: 'Médicos', icon: 'bi-heart-pulse', accent: '#7c5cff', value: null },
    { label: 'Citas', icon: 'bi-journal-medical', accent: '#0ea5a0', value: null },
    { label: 'Habitaciones', icon: 'bi-door-closed', accent: '#f59e0b', value: null }
  ];

  groups: ModuleGroup[] = [
    {
      label: 'Gestión Médica',
      icon: 'bi-heart-pulse',
      accent: '#3366ff',
      items: [
        { label: 'Pacientes', path: '/pacientes', icon: 'bi-people-fill' },
        { label: 'Médicos', path: '/medicos', icon: 'bi-heart-pulse' },
        { label: 'Historias Clínicas', path: '/historia-clinica', icon: 'bi-clipboard2-pulse' },
        { label: 'Diagnósticos', path: '/diagnostico', icon: 'bi-file-medical' },
        { label: 'Antecedentes', path: '/antecedente', icon: 'bi-file-text' },
        { label: 'Alergias', path: '/alergia', icon: 'bi-exclamation-triangle' }
      ]
    },
    {
      label: 'Servicios Clínicos',
      icon: 'bi-hospital',
      accent: '#0ea5a0',
      items: [
        { label: 'Citas', path: '/cita', icon: 'bi-journal-medical' },
        { label: 'Cirugías', path: '/cirugia', icon: 'bi-journal-medical' },
        { label: 'Laboratorio', path: '/laboratorio', icon: 'bi-droplet' },
        { label: 'Prescripciones', path: '/prescripcion', icon: 'bi-prescription' },
        { label: 'Equipo Médico', path: '/equipo-medico', icon: 'bi-tools' },
        { label: 'Habitaciones', path: '/habitacion', icon: 'bi-door-closed' }
      ]
    },
    {
      label: 'Administración',
      icon: 'bi-gear',
      accent: '#7c5cff',
      items: [
        { label: 'Empleados', path: '/empleados', icon: 'bi-person-badge' },
        { label: 'Jornadas Laborales', path: '/jornada-laboral', icon: 'bi-clock-history' },
        { label: 'Programas', path: '/programa', icon: 'bi-calendar-event' }
      ]
    },
    {
      label: 'Facturación',
      icon: 'bi-cash-coin',
      accent: '#f59e0b',
      items: [
        { label: 'Facturas', path: '/factura', icon: 'bi-receipt' },
        { label: 'Tipos de Factura', path: '/tipo-factura', icon: 'bi-receipt-cutoff' },
        { label: 'Conceptos', path: '/concepto-factura', icon: 'bi-list-check' }
      ]
    },
    {
      label: 'Seguros',
      icon: 'bi-shield-check',
      accent: '#06aed4',
      items: [
        { label: 'Seguros de Salud', path: '/seguro-salud', icon: 'bi-shield-plus' },
        { label: 'Pólizas', path: '/poliza', icon: 'bi-file-earmark-text' }
      ]
    },
    {
      label: 'Reclamos',
      icon: 'bi-exclamation-octagon',
      accent: '#e8554a',
      items: [
        { label: 'Reclamos', path: '/reclamo', icon: 'bi-chat-left-text' },
        { label: 'Tipos de Reclamo', path: '/tipo-reclamo', icon: 'bi-tags' },
        { label: 'Eventos Adversos', path: '/evento-adverso', icon: 'bi-exclamation-triangle' }
      ]
    },
    {
      label: 'Configuración',
      icon: 'bi-sliders',
      accent: '#64748b',
      items: [
        { label: 'Tipos de Área', path: '/tipoarea', icon: 'bi-grid' },
        { label: 'Tipos de Documento', path: '/tipodocumento', icon: 'bi-file-earmark' },
        { label: 'Jornadas por Día', path: '/jornada-dia', icon: 'bi-calendar-day' }
      ]
    }
  ];

  constructor(
    private pacienteService: PacienteService,
    private medicoService: MedicoService,
    private citaService: CitaService,
    private habitacionService: HabitacionService
  ) { }

  ngOnInit(): void {
    this.cargarConteo(0, this.pacienteService.obtenerTodos());
    this.cargarConteo(1, this.medicoService.obtenerTodos());
    this.cargarConteo(2, this.citaService.obtenerTodas());
    this.cargarConteo(3, this.habitacionService.obtenerTodos());
  }

  private cargarConteo(index: number, obs: import('rxjs').Observable<unknown[]>): void {
    obs.pipe(catchError(() => of(null))).subscribe(result => {
      this.stats[index].value = Array.isArray(result) ? result.length : null;
    });
  }
}
