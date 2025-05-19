import { Routes } from '@angular/router';

export const routes: Routes = [
  { 
    path: 'pacientes',
    loadChildren: () => import('./features/paciente/routes/paciente.routes')
      .then(m => m.PACIENTE_ROUTES)
  },
   { 
    path: 'medicos',
    loadChildren: () => import('./features/medico/routes/medico.routes')
      .then(m => m.MEDICO_ROUTES)
  },
  { 
    path: 'empleados',
    loadChildren: () => import('./features/empleado/routes/empleado.routes')
      .then(m => m.EMPLEADO_ROUTES)
  },
  { 
    path: 'equipo-medico',
    loadChildren: () => import('./features/equipo-medico/routes/equipo-medico.routes')
      .then(m => m.EQUIPO_MEDICO_ROUTES)
  },
  { 
    path: 'diagnostico',
    loadChildren: () => import('./features/diagnostico/routes/diagnostico.routes')
      .then(m => m.DIAGNOSTICO_ROUTES)
  },
  { 
    path: 'historia-clinica',
    loadChildren: () => import('./features/historia-clinica/routes/historia-clinica.routes')
      .then(m => m.HISTORIA_CLINICA_ROUTES)
  },
  {
    path: 'seguro-salud',
    loadChildren: () => import('./features/seguro-salud/routes/seguro-salud.routes')
      .then(m => m.SEGURO_SALUD_ROUTES)
  },
  {
    path: 'poliza',
    loadChildren: () => import('./features/poliza/routes/poliza.routes')
      .then(m => m.POLIZA_ROUTES)
  },
  {
    path: 'habitacion',
    loadChildren: () => import('./features/habitacion/routes/habitacion.routes')
      .then(m => m.HABITACION_ROUTES)
  },
   { 
    path: 'reclamo',
    loadChildren: () => import('./features/reclamo/routes/reclamo.routes')
      .then(m => m.RECLAMO_ROUTES)
  },
  { 
    path: 'alergia',
    loadChildren: () => import('./features/alergia/routes/alergia.routes')
      .then(m => m.ALERGIA_ROUTES)
  },
  { 
    path: 'antecedente',
    loadChildren: () => import('./features/antecedente/routes/antecedente.routes')
      .then(m => m.ANTECEDENTE_ROUTES)
  },
  { 
    path: 'concepto-factura',
    loadChildren: () => import('./features/concepto-factura/routes/concepto-factura.routes')
      .then(m => m.CONCEPTO_FACTURA_ROUTES)
  },
   { 
    path: 'evento-adverso',
    loadChildren: () => import('./features/evento-adverso/routes/evento-adverso.routes')
      .then(m => m.EVENTO_ADVERSO_ROUTES)
  },
  { 
    path: 'factura',
    loadChildren: () => import('./features/factura/routes/factura.routes')
      .then(m => m.FACTURA_ROUTES)
  },
  { 
    path: 'jornada-dia',
    loadChildren: () => import('./features/jornada-dia/routes/jornada-dia.routes')
      .then(m => m.JORNADA_DIA_ROUTES)
  },
  { 
    path: 'jornada-laboral',
    loadChildren: () => import('./features/jornada-laboral/routes/jornada-laboral.routes')
      .then(m => m.JORNADA_LABORAL_ROUTES)
  },
   { 
    path: 'laboratorio',
    loadChildren: () => import('./features/laboratorio/routes/laboratorio.routes')
      .then(m => m.LABORATORIO_ROUTES)
  },
  { 
    path: 'prescripcion',
    loadChildren: () => import('./features/prescripcion/routes/prescripcion.routes')
      .then(m => m.PRESCRIPCION_ROUTES)
  },
  { 
    path: 'programa',
    loadChildren: () => import('./features/programa/routes/programa.routes')
      .then(m => m.PROGRAMA_ROUTES)
  },
  { 
    path: 'tipoarea',
    loadChildren: () => import('./features/tipo-area/routes/tipo-area.routes')
      .then(m => m.TIPO_AREA_ROUTES)
  },
  { 
    path: 'tipodocumento',
    loadChildren: () => import('./features/tipo-documento/routes/tipo-documento.routes')
      .then(m => m.TIPO_DOCUMENTO_ROUTES)
  },
  { 
    path: 'tipo-factura',
    loadChildren: () => import('./features/tipo-factura/routes/tipo-factura.routes')
      .then(m => m.TIPO_FACTURA_ROUTES)
  },
   { 
    path: 'tipo-reclamo',
    loadChildren: () => import('./features/tipo-reclamo/routes/tipo-reclamo.routes')
      .then(m => m.TIPO_RECLAMO_ROUTES)
  },
];
