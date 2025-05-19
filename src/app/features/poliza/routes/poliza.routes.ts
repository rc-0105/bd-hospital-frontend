import { Routes } from '@angular/router';
import { PolizaListComponent } from '../componentes/poliza-list/poliza-list.component';
import { PolizaDetailComponent } from '../componentes/poliza-detail/poliza-detail.component';
import { PolizaFormComponent } from '../componentes/poliza-form/poliza-form.component';
 
export const POLIZA_ROUTES: Routes = [
  { 
    path: '',
    component: PolizaListComponent,
    children: [
      { path: 'nuevo', component: PolizaFormComponent },
      { path: 'editar/:id', component: PolizaFormComponent },
      { path: ':id', component: PolizaDetailComponent }
    ]
  }
];