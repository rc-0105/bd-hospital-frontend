import { Routes } from '@angular/router';
import { TipoReclamoFormComponent } from '../componentes/tipo-reclamo-form/tipo-reclamo-form.component';
import { TipoReclamoListComponent } from '../componentes/tipo-reclamo-list/tipo-reclamo-list.component';
 
export const TIPO_RECLAMO_ROUTES: Routes = [
  { 
    path: '',
    component: TipoReclamoListComponent,
    children: [
      { path: 'nuevo', component: TipoReclamoFormComponent },
      { path: 'editar/:id', component: TipoReclamoFormComponent }
    ]
  }
];