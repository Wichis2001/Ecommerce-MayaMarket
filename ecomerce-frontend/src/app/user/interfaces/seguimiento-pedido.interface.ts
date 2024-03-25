export interface SeguimientoPedido {
  _id:           string;
  estado:        EstadoPedido;
  productos:     ProductoElement[];
  fecha_entrega: Date;
}

export interface ProductoElement {
  producto: ProductoProducto;
}

export interface ProductoProducto {
  _id:    string;
  nombre: string;
}

export enum EstadoPedido {
  EnCurso   = "EN_CURSO",
  Entregado = "ENTREGADO"
}
