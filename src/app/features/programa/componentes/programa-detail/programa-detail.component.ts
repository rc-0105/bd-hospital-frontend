import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ProgramaService } from '../../services/programa.service';
import { Programa } from '../../models/programa.model';
 
@Component({
  selector: 'app-programa-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './programa-detail.component.html',
  styleUrls: ['./programa-detail.component.css']
})
export class ProgramaDetailComponent implements OnInit {
  programa?: Programa;

  constructor(
    private route: ActivatedRoute,
    private programaService: ProgramaService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.programaService.obtenerPorId(+id).subscribe({
        next: (data) => this.programa = data,
        error: () => this.programa = undefined
      });
    }
  }

  getEstadoClass(estado: string): string {
    switch (estado) {
      case 'ACTIVO': return 'success';
      case 'INACTIVO': return 'warning';
      case 'FINALIZADO': return 'secondary';
      case 'PENDIENTE': return 'info';
      default: return 'light';
    }
  }
}