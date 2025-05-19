import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AntecedenteService } from '../../services/antecedente.service';
import { Antecedente } from '../../models/antecedente.model';
 
import { TruncatePipe } from '../../../../pipes/truncate.pipe';
 

@Component({
  selector: 'app-antecedente-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, TruncatePipe],
  templateUrl: './antecedente-list.component.html',
  styleUrls: ['./antecedente-list.component.css']
})
export class AntecedenteListComponent implements OnInit {
  antecedentes: Antecedente[] = [];
  tipos = ['FAMILIAR', 'PERSONAL', 'QUIRURGICO', 'ALERGICO', 'OTRO'];
  idHistoriaBusqueda?: number;
  tipoFiltro = '';

  constructor(private antecedenteService: AntecedenteService) {}

  ngOnInit(): void {
    this.loadAntecedentes();
  }

  loadAntecedentes() {
    this.antecedenteService.obtenerTodos().subscribe({
      next: (data) => this.antecedentes = data,
      error: (err) => console.error('Error cargando antecedentes:', err)
    });
  }

  buscarPorHistoria() {
    if (this.idHistoriaBusqueda) {
      this.antecedenteService.obtenerPorHistoria(this.idHistoriaBusqueda).subscribe({
        next: (data) => this.antecedentes = data,
        error: (err) => console.error('Error buscando por historia:', err)
      });
    }
  }

  aplicarFiltros() {
    let resultados = this.antecedentes;
    
    if (this.tipoFiltro) {
      resultados = resultados.filter(a => a.tipo === this.tipoFiltro);
    }
    
    return resultados;
  }

  eliminarAntecedente(id: number) {
    if (confirm('¿Estás seguro de eliminar este antecedente?')) {
      this.antecedenteService.eliminar(id).subscribe({
        next: () => this.loadAntecedentes(),
        error: (err) => console.error('Error eliminando antecedente:', err)
      });
    }
  }
}