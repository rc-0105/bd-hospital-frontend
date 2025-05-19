import { Routes } from '@angular/router';
import { ReclamoListComponent } from '../componentes/reclamo-list/reclamo-list.component';
import { ReclamoFormComponent } from '../componentes/reclamo-form/reclamo-form.component';
import { ReclamoDetailComponent } from '../componentes/reclamo-detail/reclamo-detail.component';
 

export const RECLAMO_ROUTES: Routes = [
  { 
    path: '',
    component: ReclamoListComponent,
    children: [
      { path: 'nuevo', component: ReclamoFormComponent },
      { path: 'editar/:id', component: ReclamoFormComponent },
      { path: ':id', component: ReclamoDetailComponent }
    ]
  }
];