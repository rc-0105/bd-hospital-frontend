import { Routes } from '@angular/router';
import { TipoFacturaListComponent } from '../componentes/tipo-factura-list/tipo-factura-list.component';
import { TipoFacturaFormComponent } from '../componentes/tipo-factura-form/tipo-factura-form.component';
 
export const TIPO_FACTURA_ROUTES: Routes = [
  { 
    path: '',
    component: TipoFacturaListComponent,
    children: [
      { path: 'nuevo', component: TipoFacturaFormComponent },
      { path: 'editar/:id', component: TipoFacturaFormComponent }
    ]
  }
];