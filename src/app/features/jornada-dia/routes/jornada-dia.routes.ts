import { Routes } from '@angular/router';
import { JornadaDiaListComponent } from '../componentes/jornada-dia-list/jornada-dia-list.component';
import { JornadaDiaFormComponent } from '../componentes/jornada-dia-form/jornada-dia-form.component';
 
 
export const JORNADA_DIA_ROUTES: Routes = [
  { 
    path: '',
    component: JornadaDiaListComponent,
    children: [
      { path: 'nuevo', component: JornadaDiaFormComponent },
      { path: 'editar/:id', component: JornadaDiaFormComponent }
    ]
  }
];