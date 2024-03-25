import { Producto } from './../interfaces/producto.intarface';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { DetalleVenta, Venta } from '../interfaces/venta.intarface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SeguimientoPedido } from '../interfaces/seguimiento-pedido.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VentaService {


  private baseUrl: string = environment.baseUrl;
  private _detalleVenta: DetalleVenta[] = [];

  private _total: number = 0;
  private _cantidad: number = 0;


  constructor( private http: HttpClient ) { }



  get total(){
    this._total = 0;
    this.detalleVenta.forEach( (detalle )=> {
      this._total += detalle.sub_total
    })
    return this._total;
  }

  get cantidad(){
    this._cantidad = this.detalleVenta.length;
    return this._cantidad;
  }

  get detalleVenta() {
    return this._detalleVenta;
  }

  agregarDetalleVenta(producto: Producto, subTotal: number, cantidad: number) {
    const detalleExistente = this.detalleVenta.find(detalle => detalle.producto._id === producto._id);

    if ( detalleExistente ) {
      detalleExistente.sub_total = subTotal;
      detalleExistente.cantidad = cantidad;
    } else {
      const detalleVentaAsignado: DetalleVenta = { producto, sub_total: subTotal, cantidad };
      this.detalleVenta.push(detalleVentaAsignado);
    }
  }

  eliminarDetalleVenta(detalle: DetalleVenta) {
    const index = this._detalleVenta.findIndex(d => d === detalle);
    if (index !== -1) {
      this.detalleVenta.splice(index, 1);
    }

  }

  vaciarCarrito(){
    this.detalleVenta.splice(0, this.detalleVenta.length);

  }

  postVenta( ){
    const headers = new HttpHeaders()
      .set('x-token', localStorage.getItem('token') || '' );
    const venta: Venta = {
      total: this.total,
      productos: this.detalleVenta
    }
    console.log( venta )
    return this.http.post<Venta>(`${ this.baseUrl }/ventas`, venta, { headers});
  }

  reiniciarVariables(){
    this._total = 0;
    this._cantidad = 0;
    this._detalleVenta = []
  }

  getOrdenes():Observable<SeguimientoPedido[]> {
    const headers = new HttpHeaders()
      .set('x-token', localStorage.getItem('token') || '' );
    return this.http.get<SeguimientoPedido[]>(`${ this.baseUrl }/ventas`, { headers});
  }

}
