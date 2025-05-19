import { Routes } from '@angular/router';
import { EmpleadoFormComponent } from '../componentes/empleado-form/empleado-form.component';
import { EmpleadoListComponent } from '../componentes/empleado-list/empleado-list.component';
 
export const EMPLEADO_ROUTES: Routes = [
  { 
    path: '',
    component: EmpleadoListComponent,
    children: [
      { path: 'nuevo', component: EmpleadoFormComponent },
      { path: 'editar/:id', component: EmpleadoFormComponent }
    ]
  }
];