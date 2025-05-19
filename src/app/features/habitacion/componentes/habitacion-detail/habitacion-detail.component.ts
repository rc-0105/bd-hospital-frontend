import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { HabitacionService } from '../../services/habitacion.service';
import { Habitacion } from '../../models/habitacion.model';
 

@Component({
  selector: 'app-habitacion-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './habitacion-detail.component.html',
  styleUrls: ['./habitacion-detail.component.css']
})
export class HabitacionDetailComponent implements OnInit {
  habitacion?: Habitacion;

  constructor(
    private route: ActivatedRoute,
    private habitacionService: HabitacionService 
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.habitacionService.obtenerPorId(+id).subscribe({
        next: (data) => this.habitacion = data,
        error: () => this.habitacion = undefined
      });
    }
  }
}