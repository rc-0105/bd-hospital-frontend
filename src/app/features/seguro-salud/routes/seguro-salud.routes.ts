import { Routes } from '@angular/router';
import { SeguroSaludListComponent } from '../componentes/seguro-salud-list/seguro-salud-list.component';
import { SeguroSaludFormComponent } from '../componentes/seguro-salud-form/seguro-salud-form.component';
import { SeguroSaludDetailComponent } from '../componentes/seguro-salud-detail/seguro-salud-detail.component';
 

export const SEGURO_SALUD_ROUTES: Routes = [
  { 
    path: '',
    component: SeguroSaludListComponent,
    children: [
      { path: 'nuevo', component: SeguroSaludFormComponent },
      { path: 'editar/:id', component: SeguroSaludFormComponent },
      { path: ':id', component: SeguroSaludDetailComponent }
    ]
  }
];