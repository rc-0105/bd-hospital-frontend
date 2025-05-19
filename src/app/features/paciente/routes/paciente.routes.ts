import { Routes } from '@angular/router';
import { PacienteListComponent } from '../componentes/paciente-list/paciente-list.component';
import { PacienteFormComponent } from '../componentes/paciente-form/paciente-form.component';
import { PacienteDetailComponent } from '../componentes/paciente-detail/paciente-detail.component';


export const PACIENTE_ROUTES: Routes = [
  { 
    path: '',
    component: PacienteListComponent,
    children: [
      { path: 'nuevo', component: PacienteFormComponent },
      { path: 'editar/:id', component: PacienteFormComponent },
      { path: ':id', component: PacienteDetailComponent }
    ]
  }
];