import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Producto } from 'src/app/user/interfaces/producto.intarface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class IngresosService {

  private baseUrl: string = environment.baseUrl;


  constructor( private http: HttpClient,
               private authSerive: AuthService,
               private router: Router ) { }

  getProductos():Observable<Producto[]> {
    return this.http.get<Producto[]>(`${ this.baseUrl }/productos/package`);
  }

  aprobarProducto( producto: Producto ): Observable<Producto> {
    if ( !producto._id ) throw Error('Producto id is required');
    const headers = new HttpHeaders()
      .set('x-token', localStorage.getItem('token') || '' );
    return this.http.put<Producto>(`${ this.baseUrl }/productos/aprobar/${ producto._id }`, producto, { headers });
  }

  rechazar( producto: Producto ): Observable<Producto> {
    if ( !producto._id ) throw Error('Producto id is required');
    const headers = new HttpHeaders()
      .set('x-token', localStorage.getItem('token') || '' );
    return this.http.put<Producto>(`${ this.baseUrl }/productos/rechazar/${ producto._id }`, producto, { headers });
  }
}
