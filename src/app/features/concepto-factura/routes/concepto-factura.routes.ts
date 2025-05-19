import { Routes } from '@angular/router';
import { ConceptoFacturaFormComponent } from '../componentes/concepto-factura-form/concepto-factura-form.component';
import { ConceptoFacturaListComponent } from '../componentes/concepto-factura-list/concepto-factura-list.component';
import { ConceptoFacturaDetailComponent } from '../componentes/concepto-factura-detail/concepto-factura-detail.component';
 
export const CONCEPTO_FACTURA_ROUTES: Routes = [
  { 
    path: '',
    component: ConceptoFacturaListComponent,
    children: [
      { path: 'nuevo', component: ConceptoFacturaFormComponent },
      { path: 'editar/:id', component: ConceptoFacturaFormComponent },
      { path: ':id', component: ConceptoFacturaDetailComponent }
    ]
  }
];