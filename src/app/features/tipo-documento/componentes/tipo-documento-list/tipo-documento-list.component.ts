import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TipoDocumentoService } from '../../services/tipo-documento.service';
import { TipoDocumento } from '../../models/tipo-documento.model';
 

@Component({
  selector: 'app-tipo-documento-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './tipo-documento-list.component.html',
  styleUrls: ['./tipo-documento-list.component.css']
})
export class TipoDocumentoListComponent implements OnInit {
  tiposDocumento: TipoDocumento[] = [];
  filtroTipo = '';

  constructor(private tipoDocumentoService: TipoDocumentoService) {}

  ngOnInit(): void {
    this.cargarTiposDocumento();
  }

  cargarTiposDocumento() {
    this.tipoDocumentoService.obtenerTodos().subscribe({
      next: (data) => this.tiposDocumento = data,
      error: (err) => console.error('Error cargando tipos de documento:', err)
    });
  }

  filtrarTiposDocumento() {
    if (!this.filtroTipo) return this.tiposDocumento;
    return this.tiposDocumento.filter(t => 
      t.tipo.toLowerCase().includes(this.filtroTipo.toLowerCase())
    );
  }

  eliminarTipoDocumento(id: number) {
    if (confirm('¿Estás seguro de eliminar este tipo de documento?')) {
      this.tipoDocumentoService.eliminar(id).subscribe({
        next: () => this.cargarTiposDocumento(),
        error: (err) => console.error('Error eliminando tipo de documento:', err)
      });
    }
  }
}