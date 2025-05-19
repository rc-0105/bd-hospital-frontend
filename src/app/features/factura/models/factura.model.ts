export interface Factura {
  id_factura: number;
  id_paciente: number;
  fecha_hora_emision: string; // O usar Date
  total: number;
  metodo_pago: string;
  estado: string;
  id_tipo: number;
  id_concepto: number;
}