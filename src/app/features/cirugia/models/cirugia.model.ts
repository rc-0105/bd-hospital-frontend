export interface Cirugia {
  id_cirugia: number;
  id_paciente: number;
  nombre_paciente: string;
  apellido_paciente: string;
  id_medico: number;
  nombre_medico: string;
  apellido_medico: string;
  fecha_hora: string; // Se recibe como string desde el backend
  tipo_procedimiento: string;
  diagnostico: string;
  observaciones: string;
}