export interface Evento {
  ID_Evento?: number;
  Nombre: string;
  Descripcion: string | null;
  RutEncargado: string;
  Fecha: string;
  Tipo: number;
  Publico: number;
  CantidadHoras: number;
  Estado: number;
}