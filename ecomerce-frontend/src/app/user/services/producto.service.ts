import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Producto, TipoCategoria } from '../interfaces/producto.intarface';
import { Imagen } from 'src/app/auth/interfaces/interfaces';
import { AuthService } from 'src/app/auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  private baseUrl: string = environment.baseUrl;


  constructor( private http: HttpClient,
               private authSerive: AuthService ) { }

  getProductos():Observable<Producto[]> {
    const headers = new HttpHeaders()
      .set('x-token', localStorage.getItem('token') || '' );
    return this.http.get<Producto[]>(`${ this.baseUrl }/productos`, { headers});
  }

  getImgById( id: string ): Observable<Blob|undefined> {
    return this.http.get(`${this.baseUrl}/uploads/productos/${id}`, { responseType: 'blob' })
    .pipe(
      catchError(error => of(undefined))
    );
  }

  getProductoByID( id: string ): Observable<Producto|undefined> {
    return this.http.get<Producto>(`${ this.baseUrl }/productos/${ id }`)
      .pipe(
        catchError( error => of(undefined) )
      );
  }

  getProductosVenta():Observable<Producto[]> {
    const headers = new HttpHeaders()
      .set('x-token', localStorage.getItem('token') || '' );
    return this.http.get<Producto[]>(`${ this.baseUrl }/productos/venta/${ this.authSerive.usuario.uid }`, { headers })
  }

  getCategorias(): Observable<TipoCategoria[]> {
    return this.http.get<TipoCategoria[]>(`${ this.baseUrl }/categorias`);
  }

  addProducto( producto: Producto ): Observable<Producto> {
    const { _id, ...resto } = producto;
    const headers = new HttpHeaders()
      .set('x-token', localStorage.getItem('token') || '' );
    return this.http.post<Producto>(`${ this.baseUrl }/productos`, resto, { headers } )
  }

  updateProducto( producto: Producto ): Observable<Producto> {
    if ( !producto._id ) throw Error('Producto id is required');
    const headers = new HttpHeaders()
      .set('x-token', localStorage.getItem('token') || '' );
    return this.http.put<Producto>(`${ this.baseUrl }/productos/${ producto._id }`, producto, { headers });
  }

  deleteProductoById( id: string ): Observable<boolean> {
    const headers = new HttpHeaders()
      .set('x-token', localStorage.getItem('token') || '' );
    return this.http.delete(`${ this.baseUrl }/productos/${ id }`, { headers })
      .pipe(
        map( resp => true ),
        catchError( err => of(false) ),
      );
  }

  getSuggestions( query: string ): Observable<Producto[]> {
    const headers = new HttpHeaders()
      .set('x-token', localStorage.getItem('token') || '' );
    return this.http.get<Producto[]>(`${ this.baseUrl }/buscar/productos/${ query }`, { headers });
  }


}
