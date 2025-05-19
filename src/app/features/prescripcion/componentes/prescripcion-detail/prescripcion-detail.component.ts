import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Prescripcion } from '../../models/prescripcion.model';
import { PrescripcionService } from '../../services/prescripcion.service';
 

@Component({
  selector: 'app-prescripcion-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './prescripcion-detail.component.html',
  styleUrls: ['./prescripcion-detail.component.css']
})
export class PrescripcionDetailComponent implements OnInit {
  prescripcion?: Prescripcion;

  constructor(
    private route: ActivatedRoute,
    private prescripcionService: PrescripcionService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.prescripcionService.obtenerPorId(+id).subscribe({
        next: (data) => this.prescripcion = data,
        error: () => this.prescripcion = undefined
      });
    }
  }
}