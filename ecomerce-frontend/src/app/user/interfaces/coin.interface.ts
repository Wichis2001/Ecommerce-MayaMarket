import { Usuario } from "src/app/auth/interfaces/interfaces";

export interface CoinResponse {
  error?: string;
  msg?: string;
  usuario?: Usuario;
}
