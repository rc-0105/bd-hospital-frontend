import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { DiagnosticoService } from '../../services/diagnostico.service';
import { Diagnostico } from '../../models/diagnostico.model';
 

@Component({
  selector: 'app-diagnostico-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './diagnostico-detail.component.html',
  styleUrls: ['./diagnostico-detail.component.css']
})
export class DiagnosticoDetailComponent implements OnInit {
  diagnostico?: Diagnostico;

  constructor(
    private route: ActivatedRoute,
    private diagnosticoService: DiagnosticoService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.diagnosticoService.obtenerPorId(+id).subscribe({
        next: (data) => this.diagnostico = data,
        error: () => this.diagnostico = undefined
      });
    }
  }
}