import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CitaService } from '../../services/cita.service';
import { Cita } from '../../models/cita.model';
 

@Component({
  selector: 'app-cita-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './cita-detail.component.html',
  styleUrls: ['./cita-detail.component.css']
})
export class CitaDetailComponent implements OnInit {
  cita?: Cita;

  constructor(
    private route: ActivatedRoute,
    private citaService: CitaService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.citaService.obtenerPorId(+id).subscribe({
        next: (data) => this.cita = data,
        error: () => this.cita = undefined
      });
    }
  }

  formatearFecha(fecha: string): string {
    return new Date(fecha).toLocaleString();
  }
}