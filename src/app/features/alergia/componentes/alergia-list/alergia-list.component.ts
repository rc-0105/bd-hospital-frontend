import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AlergiaService } from '../../services/alergia.service';
import { Alergia } from '../../models/alergia.model';
 

@Component({
  selector: 'app-alergia-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './alergia-list.component.html',
  styleUrls: ['./alergia-list.component.css']
})
export class AlergiaListComponent implements OnInit {
  alergias: Alergia[] = [];
  idHistoriaBusqueda?: number;

  constructor(private alergiaService: AlergiaService) {}

  ngOnInit(): void {
    this.loadAlergias();
  }

  loadAlergias() {
    this.alergiaService.obtenerTodos().subscribe({
      next: (data) => this.alergias = data,
      error: (err) => console.error('Error cargando alergias:', err)
    });
  }

  buscarPorHistoria() {
    if (this.idHistoriaBusqueda) {
      this.alergiaService.obtenerPorHistoria(this.idHistoriaBusqueda).subscribe({
        next: (data) => this.alergias = data,
        error: (err) => console.error('Error buscando por historia:', err)
      });
    }
  }

  eliminarAlergia(id: number) {
    if (confirm('¿Estás seguro de eliminar esta alergia?')) {
      this.alergiaService.eliminar(id).subscribe({
        next: () => this.loadAlergias(),
        error: (err) => console.error('Error eliminando alergia:', err)
      });
    }
  }
}