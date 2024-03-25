import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { environment } from 'src/environments/environment';
import { Usuario } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private baseUrl: string = environment.baseUrl;


  constructor( private http: HttpClient,
               private authSerive: AuthService,
               private router: Router ) { }

  getUsuarios():Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${ this.baseUrl }/usuarios/obtener`);
  }

  aprobarUsuarios( usuario: Usuario ): Observable<Usuario> {
    if ( !usuario.nombre ) throw Error('Producto id is required');
    const headers = new HttpHeaders()
      .set('x-token', localStorage.getItem('token') || '' );
    return this.http.put<Usuario>(`${ this.baseUrl }/usuarios/aprobar/${ usuario.nombre }`, usuario, { headers });
  }

  rechazarUsuarios( usuario: Usuario): Observable<Usuario> {
    if ( !usuario.nombre ) throw Error('Producto id is required');
    const headers = new HttpHeaders()
      .set('x-token', localStorage.getItem('token') || '' );
      return this.http.put<Usuario>(`${ this.baseUrl }/usuarios/rechazar/${ usuario.nombre }`, usuario, { headers });
  }
}
