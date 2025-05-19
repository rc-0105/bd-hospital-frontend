import { Routes } from '@angular/router';
import { CirugiaListComponent } from '../componentes/cirugia-list/cirugia-list.component';
import { CirugiaDetailComponent } from '../componentes/cirugia-detail/cirugia-detail.component';
import { CirugiaFormComponent } from '../componentes/cirugia-form/cirugia-form.component';
 

export const CIRUGIA_ROUTES: Routes = [
  { 
    path: '',
    component: CirugiaListComponent,
    children: [
      { path: 'nueva', component: CirugiaFormComponent },
      { path: 'editar/:id', component: CirugiaFormComponent },
      { path: ':id', component: CirugiaDetailComponent }
    ]
  }
];