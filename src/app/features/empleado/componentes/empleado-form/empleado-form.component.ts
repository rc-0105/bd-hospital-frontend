import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

import { Empleado, EmpleadoForm } from '../../models/empleado.model';
import { TipoArea } from '../../../tipo-area/models/tipo-area.model';
import { EmpleadoService } from '../../services/empleado.service';
import { TipoAreaService } from '../../../tipo-area/services/tipo-area.service';
 

@Component({
  selector: 'app-empleado-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './empleado-form.component.html',
  styleUrls: ['./empleado-form.component.css']
})
export class EmpleadoFormComponent implements OnInit {
  empleado: EmpleadoForm = {
    nombre: '',
    apellido: '',
    cargo: '',
    id_tparea: 0
  };
  isEdit = false;
  tiposArea: TipoArea[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private empleadoService: EmpleadoService,
    private tipoAreaService: TipoAreaService
  ) {}

  ngOnInit(): void {
    this.cargarTiposArea();
    
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.empleadoService.obtenerPorId(+id).subscribe({
        next: (data) => {
          this.empleado = {
            id_empleado: data.id_empleado,
            nombre: data.nombre,
            apellido: data.apellido,
            cargo: data.cargo,
            id_tparea: data.id_tparea
          };
        },
        error: () => this.router.navigate(['/empleado'])
      });
    }
  }

  cargarTiposArea() {
    this.tipoAreaService.obtenerTodos().subscribe({
      next: (data) => this.tiposArea = data,
      error: (err) => console.error('Error cargando tipos de área:', err)
    });
  }

  guardar() {
    const operacion = this.isEdit 
      ? this.empleadoService.actualizar(this.empleado.id_empleado!, this.empleado)
      : this.empleadoService.crear(this.empleado);

    operacion.subscribe({
      next: () => this.router.navigate(['/empleado']),
      error: (err) => console.error('Error guardando empleado:', err)
    });
  }
  cancelar() {
    this.router.navigate(['/empleado']);
  }
}