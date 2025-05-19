import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { HistoriaClinicaService } from '../../services/historia-clinica.service';
import { HistoriaClinica } from '../../models/historia-clinica.model';
 
@Component({
  selector: 'app-historia-clinica-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './historia-clinica-detail.component.html',
  styleUrls: ['./historia-clinica-detail.component.css']
})
export class HistoriaClinicaDetailComponent implements OnInit {
  historia?: HistoriaClinica;

  constructor(
    private route: ActivatedRoute,
    private historiaService: HistoriaClinicaService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.historiaService.obtenerPorId(+id).subscribe({
        next: (data) => this.historia = data,
        error: () => this.historia = undefined
      });
    }
  }
}