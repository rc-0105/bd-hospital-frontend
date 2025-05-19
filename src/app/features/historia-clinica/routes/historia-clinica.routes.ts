import { Routes } from '@angular/router';
import { HistoriaClinicaListComponent } from '../componentes/historia-clinica-list/historia-clinica-list.component';
import { HistoriaClinicaFormComponent } from '../componentes/historia-clinica-form/historia-clinica-form.component';
import { HistoriaClinicaDetailComponent } from '../componentes/historia-clinica-detail/historia-clinica-detail.component';

export const HISTORIA_CLINICA_ROUTES: Routes = [
  { 
    path: '',
    component: HistoriaClinicaListComponent,
    children: [
      { path: 'nuevo', component: HistoriaClinicaFormComponent },
      { path: 'editar/:id', component: HistoriaClinicaFormComponent },
      { path: ':id', component: HistoriaClinicaDetailComponent }
    ]
  }
];