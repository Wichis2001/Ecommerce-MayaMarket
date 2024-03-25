import { Component } from '@angular/core';
import { Producto } from '../../interfaces/producto.intarface';
import { ProductoService } from '../../services/producto.service';

@Component({
  selector: 'app-sale-page',
  templateUrl: './sale-page.component.html',
  styles: [
  ]
})
export class SalePageComponent {
  public productos: Producto[] = [];

  constructor( private productoService: ProductoService ) {}

  ngOnInit(): void {
    this.productoService.getProductosVenta()
      .subscribe( productos =>{
        this.productos = productos
      } );
  }
}
