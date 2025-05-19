import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { PolizaService } from '../../services/poliza.service';
import { Poliza } from '../../models/poliza.model';
 

@Component({
  selector: 'app-poliza-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './poliza-detail.component.html',
  styleUrls: ['./poliza-detail.component.css']
})
export class PolizaDetailComponent implements OnInit {
  poliza?: Poliza;

  constructor(
    private route: ActivatedRoute,
    private polizaService: PolizaService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.polizaService.obtenerPorId(+id).subscribe({
        next: (data) => this.poliza = data,
        error: () => this.poliza = undefined
      });
    }
  }
}