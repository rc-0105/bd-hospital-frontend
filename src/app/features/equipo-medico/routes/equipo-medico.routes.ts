import { Routes } from '@angular/router';
import { EquipoMedicoFormComponent } from '../componentes/equipo-medico-form/equipo-medico-form.component';
import { EquipoMedicoDetailComponent } from '../componentes/equipo-medico-detail/equipo-medico-detail.component';
import { EquipoMedicoListComponent } from '../componentes/equipo-medico-list/equipo-medico-list.component';
 

export const EQUIPO_MEDICO_ROUTES: Routes = [
  { 
    path: '',
    component: EquipoMedicoListComponent,
    children: [
      { path: 'nuevo', component: EquipoMedicoFormComponent },
      { path: 'editar/:id', component: EquipoMedicoFormComponent },
      { path: ':id', component: EquipoMedicoDetailComponent }
    ]
  }
];