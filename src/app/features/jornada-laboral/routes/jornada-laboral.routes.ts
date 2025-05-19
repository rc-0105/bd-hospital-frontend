import { Routes } from '@angular/router';
import { JornadaLaboralListComponent } from '../componentes/jornada-laboral-list/jornada-laboral-list.component';
import { JornadaLaboralFormComponent } from '../componentes/jornada-laboral-form/jornada-laboral-form.component';
 
export const JORNADA_LABORAL_ROUTES: Routes = [
  { 
    path: '',
    component: JornadaLaboralListComponent,
    children: [
      { path: 'nuevo', component: JornadaLaboralFormComponent },
      { path: 'editar/:id', component: JornadaLaboralFormComponent }
    ]
  }
];