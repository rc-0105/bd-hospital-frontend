import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Programa } from '../../models/programa.model';
import { ProgramaService } from '../../services/programa.service';
 

@Component({
  selector: 'app-programa-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './programa-form.component.html',
  styleUrls: ['./programa-form.component.css']
})
export class ProgramaFormComponent implements OnInit {
  programa: Programa = {
    id_programa: 0,
    nombre: '',
    institucion: '',
    fecha_hora_inicio: new Date().toISOString(),
    fecha_hora_fin: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 días después
    estado: 'ACTIVO'
  };
  isEdit = false;
  estados = ['ACTIVO', 'INACTIVO', 'FINALIZADO', 'PENDIENTE'];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private programaService: ProgramaService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.programaService.obtenerPorId(+id).subscribe({
        next: (data) => this.programa = data,
        error: () => this.router.navigate(['/programa'])
      });
    }
  }

  guardar() {
    const operacion = this.isEdit 
      ? this.programaService.actualizar(this.programa.id_programa, this.programa)
      : this.programaService.crear(this.programa);

    operacion.subscribe({
      next: () => this.router.navigate(['/programa']),
      error: (err) => console.error('Error guardando programa:', err)
    });
  }
  cancelar() {
    this.router.navigate(['/programa']);
  }
}