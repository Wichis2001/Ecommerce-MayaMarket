import { Pipe, PipeTransform } from '@angular/core';
import { Producto } from '../interfaces/producto.intarface';
import { environment } from 'src/environments/environment';

@Pipe({
  name: 'productoImagen',
  pure: false
})
export class ProductoImagenPipe implements PipeTransform {

  transform( producto: Producto  ): string {

  if ( producto.img ) {

    return `${ environment.baseUrl }/uploads/productos/${ producto._id }`;
  }

  return `assets/images/no-image.jpg`;
  }

}
