import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TipoAreaService } from '../../services/tipo-area.service';
import { TipoArea } from '../../models/tipo-area.model';
 

@Component({
  selector: 'app-tipo-area-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './tipo-area-list.component.html',
  styleUrls: ['./tipo-area-list.component.css']
})
export class TipoAreaListComponent implements OnInit {
  tiposArea: TipoArea[] = [];
  filtroTipo = '';

  constructor(private tipoAreaService: TipoAreaService) {}

  ngOnInit(): void {
    this.cargarTiposArea();
  }

  cargarTiposArea() {
    this.tipoAreaService.obtenerTodos().subscribe({
      next: (data) => this.tiposArea = data,
      error: (err) => console.error('Error cargando tipos de área:', err)
    });
  }

  filtrarTiposArea() {
    if (!this.filtroTipo) return this.tiposArea;
    return this.tiposArea.filter(t => 
      t.tipo.toLowerCase().includes(this.filtroTipo.toLowerCase())
    );
  }

  eliminarTipoArea(id: number) {
    if (confirm('¿Estás seguro de eliminar este tipo de área?')) {
      this.tipoAreaService.eliminar(id).subscribe({
        next: () => this.cargarTiposArea(),
        error: (err) => console.error('Error eliminando tipo de área:', err)
      });
    }
  }
}