import { Producto } from './../interfaces/producto.intarface';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {  Venta } from '../interfaces/venta.intarface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SeguimientoPedido } from '../interfaces/seguimiento-pedido.interface';
import { Observable } from 'rxjs';
import { CoinResponse } from '../interfaces/coin.interface';

@Injectable({
  providedIn: 'root'
})
export class VentaService {


  private baseUrl: string = environment.baseUrl;

  constructor( private http: HttpClient ) { }

  generarNuevaVenta( total: number, producto: Producto, cantidad: number ): Observable<CoinResponse>{
    const headers = new HttpHeaders()
      .set('x-token', localStorage.getItem('token') || '' );
    const venta: Venta = {
      total,
      producto,
      cantidad
    }
    console.log( venta )
    return this.http.post<CoinResponse>(`${ this.baseUrl }/ventas/vender`, venta, { headers});
  }


}
