export interface Programa {
  id_programa: number;
  nombre: string;
  institucion: string;
  fecha_hora_inicio: string; // O usar Date
  fecha_hora_fin: string; // O usar Date
  estado: string;
}