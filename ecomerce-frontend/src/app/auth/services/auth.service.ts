import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthReponse, Usuario } from '../interfaces/interfaces';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = environment.baseUrl;
  private _usuario!: Usuario;

  get usuario(){
    return { ...this._usuario };
  }

  set setUsuario(nuevoUsuario: Usuario) {
    this._usuario = { ...nuevoUsuario }; // Establece el usuario con una copia del nuevo usuario
  }

  constructor( private http: HttpClient ) { }

  registro( nombre: string, password: string ) {
    const url: string = `${this.baseUrl}/auth/new`;
    const body = { nombre, password };

    return this.http.post<AuthReponse>( url, body)
                    .pipe(
                      tap( res => {
                        if( res.ok ) {
                          localStorage.setItem('token', res.token! );
                          this._usuario = {
                            nombre: res.usuario!.nombre,
                            rol:  res.usuario!.rol,
                            estado: res.usuario!.estado!,
                            uid: res.usuario!.rol,
                            quetzal: res.usuario!.quetzal,
                            cacao: res.usuario!.cacao,
                            aprobado: res.usuario!.aprobado
                          }
                        }
                      }),
                      map( valide => valide.ok ),
                      catchError( err => of( err.error.msg ))
                    );
  }

  registrarAdministrador( nombre: string, password: string ) {
    const url: string = `${this.baseUrl}/auth/newAdmin`;
    const body = { nombre, password };

    return this.http.post<AuthReponse>( url, body)
                    .pipe(
                      tap( res => {
                        if( res.ok ) {
                        }
                      }),
                      map( valide => valide.ok ),
                      catchError( err => of( err.error.msg ))
                    );
  }

  login( nombre: string, password: string ) {
    const url: string = `${this.baseUrl}/auth/login`;
    const body = { nombre, password };

    return this.http.post<AuthReponse>( url, body)
                    .pipe(
                      tap( res => {
                        if( res.ok ) {
                          localStorage.setItem('token', res.token! );
                          this._usuario = {
                            nombre: res.usuario!.nombre,
                            rol:  res.usuario!.rol,
                            estado: res.usuario!.estado!,
                            uid: res.usuario!.uid,
                            quetzal: res.usuario!.quetzal,
                            cacao: res.usuario!.cacao,
                            aprobado: res.usuario!.aprobado
                          }
                        }
                      }),
                      map( valide => valide.ok ),
                      catchError( err => of( err.error.msg ))
                    );
  }

  validarToken(): Observable<boolean> {

    const url = `${ this.baseUrl }/auth/renew`;
    const headers = new HttpHeaders()
      .set('x-token', localStorage.getItem('token') || '' );

    return this.http.get<AuthReponse>( url, { headers } )
        .pipe(
          map( res => {
            localStorage.setItem('token', res.token! );
            this._usuario = {
              nombre: res.usuario!.nombre,
              rol:  res.usuario!.rol,
              estado: res.usuario!.estado!,
              uid: res.usuario!.uid,
              quetzal: res.usuario!.quetzal,
              cacao: res.usuario!.cacao,
              aprobado: res.usuario!.aprobado
            }
            return res.ok;
          }),
          catchError( err => of(false) )
        );

  }

  logOut() {
    localStorage.removeItem('token');
  }
}
