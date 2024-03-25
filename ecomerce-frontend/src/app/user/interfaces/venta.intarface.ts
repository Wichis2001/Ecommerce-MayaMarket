import { Producto } from "./producto.intarface";

export interface Venta {
  estado?:            Estado;
  fecha?:             Date;
  fecha_entrega?:      Date;
  usuario_comprador?: UsuarioVenta;
  total:              number;
  productos:          DetalleVenta[];
}

export interface DetalleVenta {
  producto:     Producto;
  sub_total:    number;
  cantidad:     number;
}

export interface UsuarioVenta {
  _id:         string;
  nombre:      string;
}

export enum Estado {
  enCurso = 'EN_CURSO',
  entregado = 'ENTREGADO'
}
export interface FileUploadResponse {
  nombreArchivo?:   string;
  msg           :   string;
  ok            :   boolean
}
