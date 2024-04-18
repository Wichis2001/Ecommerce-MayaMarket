import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { environment } from 'src/environments/environment';
import { Servicio } from '../interfaces/servicio.interface';

@Injectable({
  providedIn: 'root'
})
export class ServicioService {

  private baseUrl: string = environment.baseUrl;


  constructor( private http: HttpClient,
               private authSerive: AuthService ) { }

  getServicioByID( id: string ): Observable<Servicio|undefined> {
    return this.http.get<Servicio>(`${ this.baseUrl }/servicios/${ id }`)
      .pipe(
        catchError( error => of(undefined) )
      );
  }

  updateServicio( servicio: Servicio ): Observable<Servicio> {
    if ( !servicio._id ) throw Error('Servicio id is required');
    const headers = new HttpHeaders()
      .set('x-token', localStorage.getItem('token') || '' );
    return this.http.put<Servicio>(`${ this.baseUrl }/servicios/${ servicio._id }`, servicio, { headers });
  }

  addServicio( servicio: Servicio ): Observable<Servicio> {
    const { _id, ...resto } = servicio;
    const headers = new HttpHeaders()
      .set('x-token', localStorage.getItem('token') || '' );
    return this.http.post<Servicio>(`${ this.baseUrl }/servicios`, resto, { headers } )
  }

  deleteServicioById( id: string ): Observable<boolean> {
    const headers = new HttpHeaders()
      .set('x-token', localStorage.getItem('token') || '' );
    return this.http.delete(`${ this.baseUrl }/servicios/${ id }`, { headers })
      .pipe(
        map( resp => true ),
        catchError( err => of(false) ),
      );
  }

  getImgById( id: string ): Observable<Blob|undefined> {
    return this.http.get(`${this.baseUrl}/uploads/servicios/${id}`, { responseType: 'blob' })
    .pipe(
      catchError(error => of(undefined))
    );
  }

}
