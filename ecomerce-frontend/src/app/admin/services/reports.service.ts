
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RangoFechas, Reporte } from '../interfaces/reportes.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {
  private baseUrl: string = environment.baseUrl;
  constructor( private http: HttpClient ) { }

  getProductosMasVendidos( fechas: RangoFechas ): Observable<Reporte[]> {
    return this.http.get<Reporte[]>(`${ this.baseUrl }/ventas/productos-vendidos/${ fechas.fechaInicio.toISOString() }/${ fechas.fechaFin.toISOString() }`);
  }

  get5ClientesMasVendidos( fechas: RangoFechas ): Observable<Reporte[]> {
    return this.http.get<Reporte[]>(`${ this.baseUrl }/ventas/clientes-ganancias/${ fechas.fechaInicio.toISOString() }/${ fechas.fechaFin.toISOString() }`);
  }

  get5ClientesMasProductos( fechas: RangoFechas ): Observable<Reporte[]> {
    return this.http.get<Reporte[]>(`${ this.baseUrl }/ventas/clientes-productos/${ fechas.fechaInicio.toISOString() }/${ fechas.fechaFin.toISOString() }`);
  }

  get10ClientesMasPedidos( fechas: RangoFechas ): Observable<Reporte[]> {
    return this.http.get<Reporte[]>(`${ this.baseUrl }/ventas/clientes-pedidos/${ fechas.fechaInicio.toISOString() }/${ fechas.fechaFin.toISOString() }`);
  }

  get10ClientesProductosTienenVenta(): Observable<Reporte[]> {
    return this.http.get<Reporte[]>(`${ this.baseUrl }/productos/ventas-producto`);
  }
}
