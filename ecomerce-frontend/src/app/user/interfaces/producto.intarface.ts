export interface Producto {
  _id:          string;
  nombre:       string;
  descripcion:  string;
  precio:       number;
  usuario:      UsuarioProducto;
  existencia:   number;
  aprobado:     boolean;
  rechazado:    boolean;
  categoria:    TipoCategoria;
  img?:         string;
  ok?:          boolean;

}

export interface UsuarioProducto {
  _id:         string;
  nombre:      string;
}

export interface TipoCategoria {
  _id:        string;
  nombre:     string;
}

export enum Categoria {
  Tecnología = "644fdcfe62ebd0d1c9702f68",
  Hogar = "644fdcfe62ebd0d1c9702f69",
  Académico = "644fdcfe62ebd0d1c9702f6a",
  Literatura = "644fdcfe62ebd0d1c9702f6b",
  Decoración = "644fdcfe62ebd0d1c9702f6c",
  Otros = "644fdcfe62ebd0d1c9702f6d"
}
