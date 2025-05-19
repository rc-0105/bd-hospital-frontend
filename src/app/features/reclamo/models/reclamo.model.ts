export interface Reclamo {
  id_reclamo: number;
  fecha_hora_reclamo: string; // Formato ISO
  descripcion: string;
  area_responsable: string;
  estado: string;
  tipo: string;
  id_paciente: number;
}