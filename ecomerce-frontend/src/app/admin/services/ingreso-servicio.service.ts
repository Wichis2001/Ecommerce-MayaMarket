import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Servicio } from 'src/app/user/interfaces/servicio.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class IngresoServicioService {

  private baseUrl: string = environment.baseUrl;


  constructor( private http: HttpClient,
               private authSerive: AuthService,
               private router: Router ) { }

  getServicios():Observable<Servicio[]> {
    return this.http.get<Servicio[]>(`${ this.baseUrl }/servicios/obtenerServicios`);
              }


  aprobarServicio( servicio: Servicio ): Observable<Servicio> {
    if ( !servicio._id ) throw Error('Servicio id is required');
    const headers = new HttpHeaders()
      .set('x-token', localStorage.getItem('token') || '' );
    return this.http.put<Servicio>(`${ this.baseUrl }/servicios/aprobar/${ servicio._id }`, servicio, { headers });
  }

  rechazar( servicio: Servicio ): Observable<Servicio> {
    if ( !servicio._id ) throw Error('Producto id is required');
    const headers = new HttpHeaders()
      .set('x-token', localStorage.getItem('token') || '' );
    return this.http.put<Servicio>(`${ this.baseUrl }/servicios/rechazar/${ servicio._id }`, servicio, { headers });
  }
}
