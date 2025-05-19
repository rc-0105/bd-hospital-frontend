import { Routes } from '@angular/router';
import { TipoDocumentoFormComponent } from '../componentes/tipo-documento-form/tipo-documento-form.component';
import { TipoDocumentoListComponent } from '../componentes/tipo-documento-list/tipo-documento-list.component';
 
export const TIPO_DOCUMENTO_ROUTES: Routes = [
  { 
    path: '',
    component: TipoDocumentoListComponent,
    children: [
      { path: 'nuevo', component: TipoDocumentoFormComponent },
      { path: 'editar/:id', component: TipoDocumentoFormComponent }
    ]
  }
];