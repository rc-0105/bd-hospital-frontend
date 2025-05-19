import { Routes } from '@angular/router';
import { ProgramaListComponent } from '../componentes/programa-list/programa-list.component';
import { ProgramaFormComponent } from '../componentes/programa-form/programa-form.component';
import { ProgramaDetailComponent } from '../componentes/programa-detail/programa-detail.component';
 
export const PROGRAMA_ROUTES: Routes = [
  { 
    path: '',
    component: ProgramaListComponent,
    children: [
      { path: 'nuevo', component: ProgramaFormComponent },
      { path: 'editar/:id', component: ProgramaFormComponent },
      { path: ':id', component: ProgramaDetailComponent }
    ]
  }
];