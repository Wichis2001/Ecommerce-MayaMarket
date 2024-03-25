import { Component, OnInit } from '@angular/core';
import { Producto } from '../../interfaces/producto.intarface';
import { ProductoService } from '../../services/producto.service';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styles: [
  ]
})
export class ListPageComponent implements OnInit {
  public productos: Producto[] = [];

  constructor( private productoService: ProductoService ) {}

  ngOnInit(): void {
    this.productoService.getProductos()
      .subscribe( productos =>{
        this.productos = productos
      } );
  }
}
