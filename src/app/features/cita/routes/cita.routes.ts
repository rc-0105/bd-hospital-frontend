import { Routes } from '@angular/router';
import { CitaFormComponent } from '../componentes/cita-form/cita-form.component';
import { CitaDetailComponent } from '../componentes/cita-detail/cita-detail.component';
import { CitaListComponent } from '../componentes/cita-list/cita-list.component';
 

export const CITA_ROUTES: Routes = [
  { 
    path: '',
    component: CitaListComponent,
    children: [
      { path: 'nueva', component: CitaFormComponent },
      { path: 'editar/:id', component: CitaFormComponent },
      { path: ':id', component: CitaDetailComponent }
    ]
  }
];