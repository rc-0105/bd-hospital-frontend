import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { AntecedenteService } from '../../services/antecedente.service';
import { Antecedente } from '../../models/antecedente.model';
 
@Component({
  selector: 'app-antecedente-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './antecedente-detail.component.html',
  styleUrls: ['./antecedente-detail.component.css']
})
export class AntecedenteDetailComponent implements OnInit {
  antecedente?: Antecedente;

  constructor(
    private route: ActivatedRoute,
    private antecedenteService: AntecedenteService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.antecedenteService.obtenerPorId(+id).subscribe({
        next: (data) => this.antecedente = data,
        error: () => this.antecedente = undefined
      });
    }
  }
}