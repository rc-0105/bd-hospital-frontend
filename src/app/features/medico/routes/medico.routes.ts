import { Routes } from '@angular/router';
import { MedicoFormComponent } from '../componentes/medico-form/medico-form.component';
import { MedicoListComponent } from '../componentes/medico-list/medico-list.component';
import { MedicoDetalleComponent } from '../componentes/medico-detalle/medico-detalle.component';


export const MEDICO_ROUTES: Routes = [
  { 
    path: '',
    component: MedicoListComponent,
    children: [
      { path: 'nuevo', component: MedicoFormComponent },
      { path: 'editar/:id', component: MedicoFormComponent },
      { path: ':id', component: MedicoDetalleComponent }
    ]
  }
];