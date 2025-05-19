import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { EmpleadoService } from '../../services/empleado.service';
import { Empleado } from '../../models/empleado.model';
 

@Component({
  selector: 'app-empleado-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './empleado-list.component.html',
  styleUrls: ['./empleado-list.component.css']
})
export class EmpleadoListComponent implements OnInit {
  empleados: Empleado[] = [];
  filtros: any = {
    nombre: '',
    cargo: '',
    tipoArea: ''
  };

  constructor(private empleadoService: EmpleadoService) {}

  ngOnInit(): void {
    this.cargarEmpleados();
  }

  cargarEmpleados() {
    this.empleadoService.obtenerTodos().subscribe({
      next: (data) => this.empleados = data,
      error: (err) => console.error('Error cargando empleados:', err)
    });
  }

  filtrarEmpleados() {
    return this.empleados.filter(e => {
      return (
        (!this.filtros.nombre || 
         e.nombre.toLowerCase().includes(this.filtros.nombre.toLowerCase()) ||
         e.apellido.toLowerCase().includes(this.filtros.nombre.toLowerCase())) &&
        (!this.filtros.cargo || 
         e.cargo.toLowerCase().includes(this.filtros.cargo.toLowerCase())) &&
        (!this.filtros.tipoArea || 
         e.tipoAreaNombre.toLowerCase().includes(this.filtros.tipoArea.toLowerCase()))
      );
    });
  }

  eliminarEmpleado(id: number) {
    if (confirm('¿Estás seguro de eliminar este empleado?')) {
      this.empleadoService.eliminar(id).subscribe({
        next: () => this.cargarEmpleados(),
        error: (err) => console.error('Error eliminando empleado:', err)
      });
    }
  }
}