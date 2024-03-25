export interface Tarjeta {
  propietario?: TarjetaUser;
  tarjeta:     string;
}

export interface TarjetaUser {
  _id:    string;
  nombre: string;
}
