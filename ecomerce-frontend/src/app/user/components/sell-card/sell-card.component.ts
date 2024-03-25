import { Component, Input } from '@angular/core';
import { Producto } from '../../interfaces/producto.intarface';
import { Observable } from 'rxjs';
import { ProductoService } from '../../services/producto.service';

@Component({
  selector: 'app-sell-card',
  templateUrl: './sell-card.component.html',
  styles: [
  ]
})
export class SellCardComponent {

  @Input() producto!: Producto;
  imagenObservable!: Observable<Blob|undefined>;

  imagenUrl: string = '';
  constructor( private productoService: ProductoService ){}

  ngOnInit(): void {

    if ( !this.producto ) throw Error('Producto property is required');

    this.productoService.getImgById(this.producto._id).subscribe(
      blob => {
        if (blob) {
          this.imagenUrl = URL.createObjectURL(blob);
          console.log( this.imagenUrl )
        }
      },
      error => console.error(error)
    );

  }

}
