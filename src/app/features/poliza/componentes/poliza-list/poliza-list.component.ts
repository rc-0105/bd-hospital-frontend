import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PolizaService } from '../../services/poliza.service';
import { Poliza } from '../../models/poliza.model';
 

@Component({
  selector: 'app-poliza-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './poliza-list.component.html',
  styleUrls: ['./poliza-list.component.css']
})
export class PolizaListComponent implements OnInit {
  polizas: Poliza[] = [];
  searchText: string = '';

  constructor(private polizaService: PolizaService) {}

  ngOnInit(): void {
    this.loadPolizas();
  }

  loadPolizas() {
    this.polizaService.obtenerTodos().subscribe({
      next: (data) => this.polizas = data,
      error: (err) => console.error('Error cargando pólizas:', err)
    });
  }

  eliminarPoliza(id: number) {
    if (confirm('¿Estás seguro de eliminar esta póliza?')) {
      this.polizaService.eliminar(id).subscribe({
        next: () => this.loadPolizas(),
        error: (err) => console.error('Error eliminando póliza:', err)
      });
    }
  }
}