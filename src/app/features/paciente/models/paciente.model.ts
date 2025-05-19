export interface Paciente {
  id_paciente: number;
  nombre: string;
  apellido: string;
  fecha_nacimiento: string;  // Usaremos string para manejar el formato ISO
  sexo: string;
  tipo_documento: string;
  direccion: string;
  telefono: string;
  id_seguro: number;
}