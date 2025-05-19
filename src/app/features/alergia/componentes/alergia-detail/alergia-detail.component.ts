import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { AlergiaService } from '../../services/alergia.service';
import { Alergia } from '../../models/alergia.model';
 

@Component({
  selector: 'app-alergia-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './alergia-detail.component.html',
  styleUrls: ['./alergia-detail.component.css']
})
export class AlergiaDetailComponent implements OnInit {
  alergia?: Alergia;

  constructor(
    private route: ActivatedRoute,
    private alergiaService: AlergiaService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.alergiaService.obtenerPorId(+id).subscribe({
        next: (data) => this.alergia = data,
        error: () => this.alergia = undefined
      });
    }
  }
}