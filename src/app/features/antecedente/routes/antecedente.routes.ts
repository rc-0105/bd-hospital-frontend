import { Routes } from '@angular/router';
import { AntecedenteListComponent } from '../componentes/antecedente-list/antecedente-list.component';
import { AntecedenteFormComponent } from '../componentes/antecedente-form/antecedente-form.component';
import { AntecedenteDetailComponent } from '../componentes/antecedente-detail/antecedente-detail.component';
 
export const ANTECEDENTE_ROUTES: Routes = [
  { 
    path: '',
    component: AntecedenteListComponent,
    children: [
      { path: 'nuevo', component: AntecedenteFormComponent },
      { path: 'editar/:id', component: AntecedenteFormComponent },
      { path: ':id', component: AntecedenteDetailComponent }
    ]
  }
];