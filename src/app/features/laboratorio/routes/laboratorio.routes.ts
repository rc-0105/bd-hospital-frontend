import { Routes } from "@angular/router";
import { LaboratorioListComponent } from "../componentes/laboratorio-list/laboratorio-list.component";
import { LaboratorioFormComponent } from "../componentes/laboratorio-form/laboratorio-form.component";
import { LaboratorioDetailComponent } from "../componentes/laboratorio-detail/laboratorio-detail.component";

export const LABORATORIO_ROUTES: Routes = [
  { 
    path: '',
    component: LaboratorioListComponent,
    children: [
      { path: 'nuevo', component: LaboratorioFormComponent },
      { path: 'editar/:id', component: LaboratorioFormComponent },
      { path: ':id', component: LaboratorioDetailComponent }
      ]
    }
  ];