import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { JornadaDiaService } from '../../services/jornada-dia.service';
import { JornadaDia } from '../../models/jornada-dia.model';
 
@Component({
  selector: 'app-jornada-dia-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './jornada-dia-list.component.html',
  styleUrls: ['./jornada-dia-list.component.css']
})
export class JornadaDiaListComponent implements OnInit {
  jornadas: JornadaDia[] = [];
  diasSemana = ['LUNES', 'MARTES', 'MIÉRCOLES', 'JUEVES', 'VIERNES', 'SÁBADO', 'DOMINGO'];
  filtroDia = '';

  constructor(private jornadaService: JornadaDiaService) {}

  ngOnInit(): void {
    this.cargarJornadas();
  }

  cargarJornadas() {
    this.jornadaService.obtenerTodos().subscribe({
      next: (data) => this.jornadas = data,
      error: (err) => console.error('Error cargando jornadas:', err)
    });
  }

  filtrarJornadas() {
    if (!this.filtroDia) return this.jornadas;
    return this.jornadas.filter(j => 
      j.dia_semana.toLowerCase().includes(this.filtroDia.toLowerCase())
    );
  }

  eliminarJornada(id: number) {
    if (confirm('¿Estás seguro de eliminar esta jornada?')) {
      this.jornadaService.eliminar(id).subscribe({
        next: () => this.cargarJornadas(),
        error: (err) => console.error('Error eliminando jornada:', err)
      });
    }
  }
}