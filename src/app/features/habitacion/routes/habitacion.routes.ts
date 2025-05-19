import { Routes } from '@angular/router';
 
import { HabitacionListComponent } from '../componentes/habitacion-list/habitacion-list.component';
import { HabitacionDetailComponent } from '../componentes/habitacion-detail/habitacion-detail.component';
import { HabitacionFormComponent } from '../componentes/habitacion-form/habitacion-form.component';


export const HABITACION_ROUTES: Routes = [
  { 
    path: '',
    component: HabitacionListComponent,
    children: [
      { path: 'nuevo', component: HabitacionFormComponent },
      { path: 'editar/:id', component: HabitacionFormComponent },
      { path: ':id', component: HabitacionDetailComponent }
    ]
  }
];