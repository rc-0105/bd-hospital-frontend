import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SeguroSaludService } from '../../services/seguro-salud.service';
import { SeguroSalud } from '../../models/seguro-salud.model';
 
@Component({
  selector: 'app-seguro-salud-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './seguro-salud-list.component.html',
  styleUrls: ['./seguro-salud-list.component.css']
})
export class SeguroSaludListComponent implements OnInit {
  seguros: SeguroSalud[] = [];
  searchText: string = '';

  constructor(private seguroService: SeguroSaludService) {}

  ngOnInit(): void {
    this.loadSeguros();
  }

  loadSeguros() {
    this.seguroService.obtenerTodos().subscribe({
      next: (data) => this.seguros = data,
      error: (err) => console.error('Error cargando seguros:', err)
    });
  }

  eliminarSeguro(id: number) {
    if (confirm('¿Estás seguro de eliminar este seguro de salud?')) {
      this.seguroService.eliminar(id).subscribe({
        next: (msg) => {
          alert(msg);
          this.loadSeguros();
        },
        error: (err) => console.error('Error eliminando seguro:', err)
      });
    }
  }
}