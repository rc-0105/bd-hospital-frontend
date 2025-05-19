import { Routes } from '@angular/router';
import { EventoAdversoListComponent } from '../componentes/evento-adverso-list/evento-adverso-list.component';
import { EventoAdversoFormComponent } from '../componentes/evento-adverso-form/evento-adverso-form.component';
import { EventoAdversoDetailComponent } from '../componentes/evento-adverso-detail/evento-adverso-detail.component';
 
export const EVENTO_ADVERSO_ROUTES: Routes = [
  { 
    path: '',
    component: EventoAdversoListComponent,
    children: [
      { path: 'nuevo', component: EventoAdversoFormComponent },
      { path: 'editar/:id', component: EventoAdversoFormComponent },
      { path: ':id', component: EventoAdversoDetailComponent }
    ]
  }
];