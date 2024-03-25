export interface AuthReponse {
  usuario?: Usuario;
  token?:   string;
  msg?:     string;
  ok:       boolean
}

export interface Usuario {
  nombre: string;
  rol:    Role;
  estado: boolean;
  uid:    string;
}

export enum Role {
  CommonRole = "COMMON_ROLE",
  PackageRole = "PACKAGE_ROLE",
  AdminRole = "ADMIN_ROLE"
}

export interface Imagen {
  pathImagen:   string
}
