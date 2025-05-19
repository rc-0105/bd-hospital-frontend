export interface HistoriaClinica {
  id_historia: number;
  id_paciente: number;
  fecha_hora_creacion: string; // Formato ISO
  observaciones: string;
}