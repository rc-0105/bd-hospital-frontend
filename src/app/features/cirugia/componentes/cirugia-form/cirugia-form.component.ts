import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CirugiaService } from '../../services/cirugia.service';
import { Cirugia } from '../../models/cirugia.model';
 

@Component({
  selector: 'app-cirugia-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './cirugia-form.component.html',
  styleUrls: ['./cirugia-form.component.css']
})
export class CirugiaFormComponent implements OnInit {
  cirugia: Omit<Cirugia, 'id_cirugia' | 'nombre_paciente' | 'apellido_paciente' | 'nombre_medico' | 'apellido_medico'> & { id_cirugia?: number } = {
    id_paciente: 0,
    id_medico: 0,
    fecha_hora: new Date().toISOString().slice(0, 16),
    tipo_procedimiento: 'PROGRAMADA',
    diagnostico: '',
    observaciones: ''
  };
  isEdit = false;
  tiposProcedimientos = ['MAYOR', 'MENOR', 'AMBULATORIA', 'URGENTE', 'PROGRAMADA'];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private cirugiaService: CirugiaService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.cirugiaService.obtenerPorId(+id).subscribe({
        next: (data) => {
          this.cirugia = {
            id_cirugia: data.id_cirugia,
            id_paciente: data.id_paciente,
            id_medico: data.id_medico,
            fecha_hora: data.fecha_hora.slice(0, 16), // Ajuste para input datetime-local
            tipo_procedimiento: data.tipo_procedimiento,
            diagnostico: data.diagnostico,
            observaciones: data.observaciones
          };
        },
        error: () => this.router.navigate(['/cirugia'])
      });
    }
  }

  guardar() {
    if (this.isEdit && this.cirugia.id_cirugia) {
      // Creamos un objeto con solo los campos necesarios para el backend y agregamos id_cirugia para la actualización
      const cirugiaParaActualizar = {
        id_cirugia: this.cirugia.id_cirugia,
        id_paciente: this.cirugia.id_paciente,
        id_medico: this.cirugia.id_medico,
        fecha_hora: this.formatDateTimeForBackend(this.cirugia.fecha_hora),
        tipo_procedimiento: this.cirugia.tipo_procedimiento,
        diagnostico: this.cirugia.diagnostico,
        observaciones: this.cirugia.observaciones
      };
      this.cirugiaService.actualizar(this.cirugia.id_cirugia, cirugiaParaActualizar).subscribe({
        next: () => this.router.navigate(['/cirugia']),
        error: (err) => console.error('Error guardando cirugía:', err)
      });
    } else {
      // Para creación no incluimos id_cirugia 
      const cirugiaParaGuardar = {
        id_paciente: this.cirugia.id_paciente,
        id_medico: this.cirugia.id_medico,
        fecha_hora: this.formatDateTimeForBackend(this.cirugia.fecha_hora),
        tipo_procedimiento: this.cirugia.tipo_procedimiento,
        diagnostico: this.cirugia.diagnostico,
        observaciones: this.cirugia.observaciones
      };
      this.cirugiaService.crear(cirugiaParaGuardar).subscribe({
        next: () => this.router.navigate(['/cirugia']),
        error: (err) => console.error('Error guardando cirugía:', err)
      });
    }
  }

  private formatDateTimeForBackend(dateTime: string): string {
    // Asegurarnos que la fecha esté en el formato correcto para el backend
    const date = new Date(dateTime);
    return date.toISOString(); // O el formato que espere tu backend
  }
  cancelar() {
    this.router.navigate(['/cirugia']);
  }
}