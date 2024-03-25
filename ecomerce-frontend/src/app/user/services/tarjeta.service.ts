import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Tarjeta } from '../interfaces/tarjeta.interface';
import { Observable, catchError, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TarjetaService {

  private baseUrl: string = environment.baseUrl;

  constructor( private http: HttpClient ) { }

  getTarjeta():Observable<Tarjeta> {
    const headers = new HttpHeaders()
      .set('x-token', localStorage.getItem('token') || '' );
    return this.http.get<Tarjeta>(`${ this.baseUrl }/tarjetas`, { headers});
  }

  postTarjeta( tarjeta:Tarjeta ):Observable<boolean> {
    const headers = new HttpHeaders()
      .set('x-token', localStorage.getItem('token') || '' );
    return this.http.post<Tarjeta>(`${ this.baseUrl }/tarjetas`, tarjeta, { headers })
    .pipe(
      map( resp => true ),
      catchError( err => of(false) ),
    );
  }
}
