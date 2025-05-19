export interface EventoAdverso {
  id_evento: number;
  fecha_hora_evento: string; // O usar Date si prefieres manejar objetos Date
  tipo_evento: string;
  gravedad: string;
  ubicacion: string;
  estado: string;
  acciones_tomadas: string;
  id_paciente: number;
}