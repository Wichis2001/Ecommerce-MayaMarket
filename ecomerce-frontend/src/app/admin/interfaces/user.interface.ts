export interface Usuario {
  nombre:   string;
  rol:      Role;
  estado:   boolean;
  uid:      string;
  quetzal:  number;
  cacao:    number;
  aprobado: boolean;
}

export enum Role {
  CommonRole = "COMMON_ROLE",
  PackageRole = "PACKAGE_ROLE",
  AdminRole = "ADMIN_ROLE"
}
