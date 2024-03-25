import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Producto } from '../interfaces/producto.intarface';
import { FileUploadResponse } from '../interfaces/venta.intarface';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  private baseUrl: string = environment.baseUrl;
  private _nombreArchivo!: string;

  get nombreArchivo(){
    return this._nombreArchivo;
  }

  constructor( private http: HttpClient ) { }

  actualizarImagen( producto: Producto, archivo: File ) {
    const url: string = `${ this.baseUrl }/uploads/productos/${ producto._id }`;
    const formData = new FormData();
    formData.append('archivo', archivo);

    return this.http.put<FileUploadResponse>( url, formData )
                    .pipe(
                      tap( res => {
                        if( res.ok ) {
                          this._nombreArchivo = `${ environment.baseUrl }/uploads/productos/${ producto._id }`;
                        }
                      }),
                      map( valide => valide.ok ),
                      catchError( err => of( err.error.msg ))
                    );
  }

}
