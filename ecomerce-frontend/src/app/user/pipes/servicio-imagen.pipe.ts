import { Pipe, PipeTransform } from '@angular/core';
import { Servicio } from '../interfaces/servicio.interface';
import { environment } from 'src/environments/environment';

@Pipe({
  name: 'servicioImagen',
  pure: false
})
export class ServicioImagenPipe implements PipeTransform {

  transform( service: Servicio  ): string {

    if ( service.img ) {

      return `${ environment.baseUrl }/uploads/servicios/${ service._id }`;
    }

    return `assets/images/no-image.jpg`;
  }
}
