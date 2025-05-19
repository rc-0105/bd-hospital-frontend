import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { HabitacionService } from '../../services/habitacion.service';
import { Habitacion } from '../../models/habitacion.model';
 

@Component({
  selector: 'app-habitacion-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './habitacion-form.component.html',
  styleUrls: ['./habitacion-form.component.css']
})
export class HabitacionFormComponent implements OnInit {
  habitacion: Habitacion = {
    id_habitacion: 0,
    numero: 0,
    piso: 0,
    estado: 'DISPONIBLE'
  };
  isEdit = false;
  estados = ['DISPONIBLE', 'OCUPADA', 'MANTENIMIENTO'];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private habitacionService: HabitacionService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.habitacionService.obtenerPorId(+id).subscribe({
        next: (data) => this.habitacion = data,
        error: () => this.router.navigate(['/habitacion'])
      });
    }
  }

  guardar() {
    const operacion = this.isEdit 
      ? this.habitacionService.actualizar(this.habitacion.id_habitacion, this.habitacion)
      : this.habitacionService.crear(this.habitacion);

    operacion.subscribe({
      next: () => this.router.navigate(['/habitacion']),
      error: (err) => console.error('Error guardando habitación:', err)
    });
  }
  cancelar() {
    this.router.navigate(['/habitacion']);
  }
}