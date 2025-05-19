import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Cita } from '../../models/cita.model';
import { CitaService } from '../../services/cita.service';
 

@Component({
  selector: 'app-cita-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './cita-form.component.html',
  styleUrls: ['./cita-form.component.css']
})
export class CitaFormComponent implements OnInit {
  cita: Cita = {
    id_cita: 0,
    id_paciente: 0,
    nombre_paciente: '',
    apellido_paciente: '',
    id_medico: 0,
    nombre_medico: '',
    apellido_medico: '',
    fecha_hora_cita: new Date().toISOString(),
    estado: 'PENDIENTE'
  };
  isEdit = false;
  estados = ['PENDIENTE', 'CONFIRMADA', 'COMPLETADA', 'CANCELADA'];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private citaService: CitaService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.citaService.obtenerPorId(+id).subscribe({
        next: (data) => {
          this.cita = data;
          // Asegurar que la fecha esté en el formato correcto para el input datetime-local
          this.cita.fecha_hora_cita = this.formatDateForInput(data.fecha_hora_cita);
        },
        error: () => this.router.navigate(['/cita'])
      });
    }
  }

  guardar() {
    // Convertir la fecha al formato esperado por el backend
    const citaParaGuardar = {
      ...this.cita,
      fecha_hora_cita: new Date(this.cita.fecha_hora_cita).toISOString()
    };

    const operacion = this.isEdit 
      ? this.citaService.actualizar(this.cita.id_cita, citaParaGuardar)
      : this.citaService.crear(citaParaGuardar);

    operacion.subscribe({
      next: () => this.router.navigate(['/cita']),
      error: (err) => console.error('Error guardando cita:', err)
    });
  }

  private formatDateForInput(dateString: string): string {
    const date = new Date(dateString);
    return date.toISOString().slice(0, 16); // Formato YYYY-MM-DDTHH:MM
  }
  cancelar() {
    this.router.navigate(['/cita']);
  }
}