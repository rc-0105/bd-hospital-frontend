import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ReclamoService } from '../../services/reclamo.service';
import { Reclamo } from '../../models/reclamo.model';
 

@Component({
  selector: 'app-reclamo-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './reclamo-detail.component.html',
  styleUrls: ['./reclamo-detail.component.css']
})
export class ReclamoDetailComponent implements OnInit {
  reclamo?: Reclamo;

  constructor(
    private route: ActivatedRoute,
    private reclamoService: ReclamoService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.reclamoService.obtenerPorId(+id).subscribe({
        next: (data) => this.reclamo = data,
        error: () => this.reclamo = undefined
      });
    }
  }
}