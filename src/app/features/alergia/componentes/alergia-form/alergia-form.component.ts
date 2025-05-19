import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Alergia } from '../../models/alergia.model';
import { AlergiaService } from '../../services/alergia.service';
 

@Component({
  selector: 'app-alergia-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './alergia-form.component.html',
  styleUrls: ['./alergia-form.component.css']
})
export class AlergiaFormComponent implements OnInit {
  alergia: Alergia = {
    id_al: 0,
    descripcion: '',
    id_historia: 0
  };
  isEdit = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private alergiaService: AlergiaService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.alergiaService.obtenerPorId(+id).subscribe({
        next: (data) => this.alergia = data,
        error: () => this.router.navigate(['/alergia'])
      });
    }
  }

  guardar() {
    const operacion = this.isEdit 
      ? this.alergiaService.actualizar(this.alergia.id_al, this.alergia)
      : this.alergiaService.crear(this.alergia);

    operacion.subscribe({
      next: () => this.router.navigate(['/alergia']),
      error: (err) => console.error('Error guardando alergia:', err)
    });
  }
  cancelar() {
    this.router.navigate(['/alergia']);
  }
}