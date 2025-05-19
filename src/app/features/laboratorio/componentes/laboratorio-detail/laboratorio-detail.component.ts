import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { LaboratorioService } from '../../services/laboratorio.service';
import { Laboratorio } from '../../models/laboratorio.model';
 

@Component({
  selector: 'app-laboratorio-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './laboratorio-detail.component.html',
  styleUrls: ['./laboratorio-detail.component.css']
})
export class LaboratorioDetailComponent implements OnInit {
  examen?: Laboratorio;

  constructor(
    private route: ActivatedRoute,
    private laboratorioService: LaboratorioService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.laboratorioService.obtenerPorId(+id).subscribe({
        next: (data) => this.examen = data,
        error: () => this.examen = undefined
      });
    }
  }

  getResultadoClass(resultado: string): string {
    if (!resultado) return 'secondary';
    if (resultado.toLowerCase().includes('normal')) return 'success';
    if (resultado.toLowerCase().includes('anormal')) return 'danger';
    return 'info';
  }
}