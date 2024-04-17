import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CoinManagment, CoinResponse } from '../interfaces/coin.interface';
import { UsuarioService } from 'src/app/admin/services/usuario.service';
import { AuthService } from 'src/app/auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class CoinService {

  private baseUrl: string = environment.baseUrl;


  constructor( private http: HttpClient,
               private authService: AuthService) { }

  intercambiarQuetzales( cantidad: number ): Observable<CoinResponse>{
    const headers = new HttpHeaders()
      .set('x-token', localStorage.getItem('token') || '' );
    return this.http.put<CoinResponse>(`${ this.baseUrl }/usuarios/depositarQuetzales/${ cantidad }`, this.authService.usuario, { headers });
  }

}
