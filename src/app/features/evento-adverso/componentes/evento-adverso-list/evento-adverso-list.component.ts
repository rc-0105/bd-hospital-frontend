import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { EventoAdversoService } from '../../services/evento-adverso.service';
import { EventoAdverso } from '../../models/evento-adverso.model';
import { ReplaceUnderscorePipe } from '../../../../pipes/replaceUnderscore.pipe';
 
@Component({
  selector: 'app-evento-adverso-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule,ReplaceUnderscorePipe],
  templateUrl: './evento-adverso-list.component.html',
  styleUrls: ['./evento-adverso-list.component.css']
})
export class EventoAdversoListComponent implements OnInit {
  eventos: EventoAdverso[] = [];
  tiposEvento = ['MEDICAMENTOSO', 'QUIRURGICO', 'INFECCION', 'CAIDA', 'OTRO'];
  gravedades = ['LEVE', 'MODERADO', 'GRAVE', 'FATAL'];
  estados = ['REPORTADO', 'EN_INVESTIGACION', 'RESUELTO', 'CERRADO'];
  filtros: any = {};

  constructor(private eventoService: EventoAdversoService) {}

  ngOnInit(): void {
    this.cargarEventos();
  }

  cargarEventos() {
    this.eventoService.obtenerTodos().subscribe({
      next: (data) => this.eventos = data,
      error: (err) => console.error('Error cargando eventos:', err)
    });
  }

  aplicarFiltros() {
    return this.eventos.filter(evento => {
      return Object.keys(this.filtros).every(key => {
        if (!this.filtros[key]) return true;
        return evento[key as keyof EventoAdverso] == this.filtros[key];
      });
    });
  }

  eliminarEvento(id: number) {
    if (confirm('¿Estás seguro de eliminar este evento?')) {
      this.eventoService.eliminar(id).subscribe({
        next: () => this.cargarEventos(),
        error: (err) => console.error('Error eliminando evento:', err)
      });
    }
  }
  getGravedadClass(gravedad: string): string {
    switch ((gravedad || '').toLowerCase()) {
      case 'alta':
        return 'danger';
      case 'media':
        return 'warning';
      case 'baja':
        return 'success';
      default:
        return 'secondary';
    }
  }
}