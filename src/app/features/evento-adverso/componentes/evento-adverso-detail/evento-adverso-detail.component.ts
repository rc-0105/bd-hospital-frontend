import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { EventoAdversoService } from '../../services/evento-adverso.service';
import { EventoAdverso } from '../../models/evento-adverso.model';
import { ReplaceUnderscorePipe } from '../../../../pipes/replaceUnderscore.pipe';
 

@Component({
  selector: 'app-evento-adverso-detail',
  standalone: true,
  imports: [CommonModule, RouterModule,ReplaceUnderscorePipe],
  templateUrl: './evento-adverso-detail.component.html',
  styleUrls: ['./evento-adverso-detail.component.css']
})
export class EventoAdversoDetailComponent implements OnInit {
  evento?: EventoAdverso;

  constructor(
    private route: ActivatedRoute,
    private eventoService: EventoAdversoService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.eventoService.obtenerPorId(+id).subscribe({
        next: (data) => this.evento = data,
        error: () => this.evento = undefined
      });
    }
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
}