import { Routes } from '@angular/router';
import { FacturaListComponent } from '../componentes/factura-list/factura-list.component';
import { FacturaFormComponent } from '../componentes/factura-form/factura-form.component';
import { FacturaDetailComponent } from '../componentes/factura-detail/factura-detail.component';
 
export const FACTURA_ROUTES: Routes = [
  { 
    path: '',
    component: FacturaListComponent,
    children: [
      { path: 'nuevo', component: FacturaFormComponent },
      { path: 'editar/:id', component: FacturaFormComponent },
      { path: ':id', component: FacturaDetailComponent }
    ]
  }
];