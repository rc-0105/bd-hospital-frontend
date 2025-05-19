export interface Cita {
  id_cita: number;
  id_paciente: number;
  nombre_paciente: string;
  apellido_paciente: string;
  id_medico: number;
  nombre_medico: string;
  apellido_medico: string;
  fecha_hora_cita: string; // o Date si prefieres manejar objetos Date
  estado: string;
}