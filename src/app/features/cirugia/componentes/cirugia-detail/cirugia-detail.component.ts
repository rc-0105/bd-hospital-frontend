import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CirugiaService } from '../../services/cirugia.service';
import { Cirugia } from '../../models/cirugia.model';
 

@Component({
  selector: 'app-cirugia-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './cirugia-detail.component.html',
  styleUrls: ['./cirugia-detail.component.css']
})
export class CirugiaDetailComponent implements OnInit {
  cirugia?: Cirugia;

  constructor(
    private route: ActivatedRoute,
    private cirugiaService: CirugiaService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.cirugiaService.obtenerPorId(+id).subscribe({
        next: (data) => this.cirugia = data,
        error: () => this.cirugia = undefined
      });
    }
  }

  formatearFecha(fecha: string): string {
    return new Date(fecha).toLocaleString();
  }
}