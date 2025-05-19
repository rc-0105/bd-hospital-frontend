import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { JornadaLaboralService } from '../../services/jornada-laboral.service';
import { JornadaLaboral } from '../../models/jornada-laboral.model';
 

@Component({
  selector: 'app-jornada-laboral-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './jornada-laboral-form.component.html',
  styleUrls: ['./jornada-laboral-form.component.css']
})
export class JornadaLaboralFormComponent implements OnInit {
  jornada: JornadaLaboral = {
    id_jornada: 0,
    fecha_hora_inicio: new Date().toISOString(),
    fecha_hora_cierre: '',
    id_empleado: 0
  };
  isEdit = false;
  mostrarCierre = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private jornadaService: JornadaLaboralService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.jornadaService.obtenerPorId(+id).subscribe({
        next: (data) => {
          this.jornada = data;
          this.mostrarCierre = !!data.fecha_hora_cierre;
        },
        error: () => this.router.navigate(['/jornada-laboral'])
      });
    }
  }

  guardar() {
    if (!this.mostrarCierre) {
      this.jornada.fecha_hora_cierre = '';
    }

    const operacion = this.isEdit 
      ? this.jornadaService.actualizar(this.jornada.id_jornada, this.jornada)
      : this.jornadaService.crear(this.jornada);

    operacion.subscribe({
      next: () => this.router.navigate(['/jornada-laboral']),
      error: (err) => console.error('Error guardando jornada:', err)
    });
  }

  toggleCierre() {
    this.mostrarCierre = !this.mostrarCierre;
    if (!this.mostrarCierre) {
      this.jornada.fecha_hora_cierre = '';
    } else {
      this.jornada.fecha_hora_cierre = new Date().toISOString();
    }
  }
  cancelar() {
    this.router.navigate(['/jornada-laboral']);
  }
}