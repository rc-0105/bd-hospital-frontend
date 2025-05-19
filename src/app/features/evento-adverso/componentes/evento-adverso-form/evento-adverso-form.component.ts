import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { EventoAdverso } from '../../models/evento-adverso.model';
import { EventoAdversoService } from '../../services/evento-adverso.service';
import { ReplaceUnderscorePipe } from '../../../../pipes/replaceUnderscore.pipe';
 

@Component({
  selector: 'app-evento-adverso-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule,ReplaceUnderscorePipe],
  templateUrl: './evento-adverso-form.component.html',
  styleUrls: ['./evento-adverso-form.component.css']
})
export class EventoAdversoFormComponent implements OnInit {
  evento: EventoAdverso= {
    id_evento: 0,
    fecha_hora_evento: new Date().toISOString(),
    tipo_evento: 'MEDICAMENTOSO',
    gravedad: 'LEVE',
    ubicacion: '',
    estado: 'REPORTADO',
    acciones_tomadas: '',
    id_paciente: 0
  };
  isEdit = false;
  tiposEvento = ['MEDICAMENTOSO', 'QUIRURGICO', 'INFECCION', 'CAIDA', 'OTRO'];
  gravedades = ['LEVE', 'MODERADO', 'GRAVE', 'FATAL'];
  estados = ['REPORTADO', 'EN_INVESTIGACION', 'RESUELTO', 'CERRADO'];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private eventoService: EventoAdversoService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.eventoService.obtenerPorId(+id).subscribe({
        next: (data) => this.evento = data,
        error: () => this.router.navigate(['/evento-adverso'])
      });
    }
  }

  guardar() {
    const operacion = this.isEdit 
      ? this.eventoService.actualizar(this.evento.id_evento, this.evento)
      : this.eventoService.crear(this.evento);

    operacion.subscribe({
      next: () => this.router.navigate(['/evento-adverso']),
      error: (err) => console.error('Error guardando evento:', err)
    });
  }

  getGravedadClass(gravedad: string): string {
    switch (gravedad) {
      case 'LEVE': return 'success';
      case 'MODERADO': return 'warning';
      case 'GRAVE': return 'danger';
      case 'FATAL': return 'dark';
      default: return 'secondary';
    }
  }
  cancelar() {
    this.router.navigate(['/evento-adverso']);
  }
}