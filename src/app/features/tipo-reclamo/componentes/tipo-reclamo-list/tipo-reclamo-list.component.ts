import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TipoReclamoService } from '../../services/tipo-reclamo.service';
import { ReplaceUnderscorePipe } from '../../../../pipes/replaceUnderscore.pipe';
import { TipoReclamo } from '../../models/tipo-reclamo.model';
 

@Component({
  selector: 'app-tipo-reclamo-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, ReplaceUnderscorePipe],
  templateUrl: './tipo-reclamo-list.component.html',
  styleUrls: ['./tipo-reclamo-list.component.css']
})
export class TipoReclamoListComponent implements OnInit {
  tiposReclamo: TipoReclamo[] = [];
  tiposComunes = ['PRODUCTO_DEFECTUOSO', 'ATENCION_CLIENTE', 'ENTREGA_TARDIA', 'FACTURACION'];
  filtroTipo = '';

  constructor(private tipoReclamoService: TipoReclamoService) {}

  ngOnInit(): void {
    this.cargarTiposReclamo();
  }

  cargarTiposReclamo() {
    this.tipoReclamoService.obtenerTodos().subscribe({
      next: (data) => this.tiposReclamo = data,
      error: (err) => console.error('Error cargando tipos de reclamo:', err)
    });
  }

  filtrarTiposReclamo() {
    if (!this.filtroTipo) return this.tiposReclamo;
    return this.tiposReclamo.filter(t => 
      t.tipo.toLowerCase().includes(this.filtroTipo.toLowerCase())
    );
  }

  eliminarTipoReclamo(id: number) {
    if (confirm('¿Estás seguro de eliminar este tipo de reclamo?')) {
      this.tipoReclamoService.eliminar(id).subscribe({
        next: () => this.cargarTiposReclamo(),
        error: (err) => console.error('Error eliminando tipo de reclamo:', err)
      });
    }
  }
}