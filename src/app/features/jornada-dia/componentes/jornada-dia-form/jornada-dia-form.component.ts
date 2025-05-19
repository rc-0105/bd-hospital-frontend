import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { JornadaDiaService } from '../../services/jornada-dia.service';
import { JornadaDia } from '../../models/jornada-dia.model';
 

@Component({
  selector: 'app-jornada-dia-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './jornada-dia-form.component.html',
  styleUrls: ['./jornada-dia-form.component.css']
})
export class JornadaDiaFormComponent implements OnInit {
  jornada: JornadaDia = {
    id_jornada: 0,
    dia_semana: 'LUNES'
  };
  isEdit = false;
  diasSemana = ['LUNES', 'MARTES', 'MIÉRCOLES', 'JUEVES', 'VIERNES', 'SÁBADO', 'DOMINGO'];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private jornadaService: JornadaDiaService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.jornadaService.obtenerPorId(+id).subscribe({
        next: (data) => this.jornada = data,
        error: () => this.router.navigate(['/jornada-dia'])
      });
    }
  }

  guardar() {
    const operacion = this.isEdit 
      ? this.jornadaService.actualizar(this.jornada.id_jornada, this.jornada)
      : this.jornadaService.crear(this.jornada);

    operacion.subscribe({
      next: () => this.router.navigate(['/jornada-dia']),
      error: (err) => console.error('Error guardando jornada:', err)
    });
  }
  cancelar() {
    this.router.navigate(['/jornada-dia']);
  }
}