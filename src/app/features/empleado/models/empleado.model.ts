export interface Empleado {
  id_empleado: number;
  nombre: string;
  apellido: string;
  cargo: string;
  id_tparea: number;
  tipoAreaNombre: string;
}

export interface EmpleadoForm {
  id_empleado?: number;
  nombre: string;
  apellido: string;
  cargo: string;
  id_tparea: number;
}