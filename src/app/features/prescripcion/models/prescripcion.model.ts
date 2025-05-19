export interface Prescripcion {
  id_prescripcion: number;
  id_consulta: number;
  fecha_hora: string; // O usar Date
  indicaciones_generales: string;
}