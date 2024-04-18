export interface Servicio {
  _id:          string;
  nombre:       string;
  descripcion:  string;
  pago:         number;
  usuario:      UsuarioServicio;
  aprobado:     boolean;
  activo:       boolean;
  img?:         string;
  ok?:          boolean;

}

export interface UsuarioServicio {
  _id:         string;
  nombre:      string;
}

export enum Estados {
  EN_ESPERA = "EN_ESPERA",
  EN_EJECUCION = "EN_EJECUCION",
  CULMINADO = "CULMINADO"
}
