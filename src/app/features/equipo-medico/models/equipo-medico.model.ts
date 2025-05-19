export interface EquipoMedico {
  id_equipo_medico: number;
  nombre: string;
  marca: string;
  fecha_hora_adquisicion: string; // Formato ISO
  modelo: string;
  estado: string;
}