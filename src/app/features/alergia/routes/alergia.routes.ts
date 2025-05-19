import { Routes } from '@angular/router';
import { AlergiaFormComponent } from '../componentes/alergia-form/alergia-form.component';
import { AlergiaDetailComponent } from '../componentes/alergia-detail/alergia-detail.component';
import { AlergiaListComponent } from '../componentes/alergia-list/alergia-list.component';
 
export const ALERGIA_ROUTES: Routes = [
  { 
    path: '',
    component: AlergiaListComponent,
    children: [
      { path: 'nuevo', component: AlergiaFormComponent },
      { path: 'editar/:id', component: AlergiaFormComponent },
      { path: ':id', component: AlergiaDetailComponent }
    ]
  }
];