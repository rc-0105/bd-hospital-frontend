import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { SeguroSaludService } from '../../services/seguro-salud.service';
import { SeguroSalud } from '../../models/seguro-salud.model';
 

@Component({
  selector: 'app-seguro-salud-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './seguro-salud-detail.component.html',
  styleUrls: ['./seguro-salud-detail.component.css']
})
export class SeguroSaludDetailComponent implements OnInit {
  seguro?: SeguroSalud;

  constructor(
    private route: ActivatedRoute,
    private seguroService: SeguroSaludService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.seguroService.obtenerPorId(+id).subscribe({
        next: (data) => this.seguro = data,
        error: () => this.seguro = undefined
      });
    }
  }
}