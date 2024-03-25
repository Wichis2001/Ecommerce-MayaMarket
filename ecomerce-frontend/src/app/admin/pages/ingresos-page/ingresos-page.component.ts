import { Component } from '@angular/core';

import { IngresosService } from '../../services/ingresos.service';
import { Producto } from 'src/app/user/interfaces/producto.intarface';

@Component({
  selector: 'app-ingresos-page',
  templateUrl: './ingresos-page.component.html',
  styles: [
  ]
})
export class IngresosPageComponent {

  public productos: Producto[] = [];

  constructor( private ingresosService: IngresosService ) {}

  ngOnInit(): void {
    this.ingresosService.getProductos()
      .subscribe( productos =>{
        this.productos = productos
      } );
  }
}
