import { Routes } from '@angular/router';
import { DiagnosticoListComponent } from '../componentes/diagnostico-list/diagnostico-list.component';
import { DiagnosticoFormComponent } from '../componentes/diagnostico-form/diagnostico-form.component';
import { DiagnosticoDetailComponent } from '../componentes/diagnostico-detail/diagnostico-detail.component';
 

export const DIAGNOSTICO_ROUTES: Routes = [
  { 
    path: '',
    component: DiagnosticoListComponent,
    children: [
      { path: 'nuevo', component: DiagnosticoFormComponent },
      { path: 'editar/:id', component: DiagnosticoFormComponent },
      { path: ':id', component: DiagnosticoDetailComponent }
    ]
  }
];