import { Routes } from '@angular/router';
import { TipoAreaFormComponent } from '../componentes/tipo-area-form/tipo-area-form.component';
import { TipoAreaListComponent } from '../componentes/tipo-area-list/tipo-area-list.component';
 
export const TIPO_AREA_ROUTES: Routes = [
  { 
    path: '',
    component: TipoAreaListComponent,
    children: [
      { path: 'nuevo', component: TipoAreaFormComponent },
      { path: 'editar/:id', component: TipoAreaFormComponent }
    ]
  }
];