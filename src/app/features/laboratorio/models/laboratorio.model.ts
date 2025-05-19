export interface Laboratorio {
  id_laboratorio: number;
  id_consulta: number;
  tipo_examen: string;
  fecha_hora_solicitud: string; // O usar Date
  resultado: string;
  observaciones: string;
}