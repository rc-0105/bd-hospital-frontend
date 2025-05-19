import { Routes } from '@angular/router';
import { PrescripcionListComponent } from '../componentes/prescripcion-list/prescripcion-list.component';
import { PrescripcionFormComponent } from '../componentes/prescripcion-form/prescripcion-form.component';
import { PrescripcionDetailComponent } from '../componentes/prescripcion-detail/prescripcion-detail.component';
 
export const PRESCRIPCION_ROUTES: Routes = [
  { 
    path: '',
    component: PrescripcionListComponent,
    children: [
      { path: 'nuevo', component: PrescripcionFormComponent },
      { path: 'editar/:id', component: PrescripcionFormComponent },
      { path: ':id', component: PrescripcionDetailComponent }
    ]
  }
];