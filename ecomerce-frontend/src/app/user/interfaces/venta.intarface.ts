import { Usuario } from "src/app/auth/interfaces/interfaces";
import { Producto } from "./producto.intarface";

export interface Venta {
  estado?:            Estado;
  fecha?:             Date;
  fecha_entrega?:      Date;
  usuario_comprador?: UsuarioVenta;
  total:              number;
  producto:           Producto;
  cantidad:           number;
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

export interface VentaResponse {
  error?: string;
  msg?: string;
  usuario?: Usuario;
  ok?: boolean
}
