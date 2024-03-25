import { Component, Input, OnInit } from '@angular/core';
import { Producto } from '../../interfaces/producto.intarface';
import { Observable } from 'rxjs';
import { ProductoService } from '../../services/producto.service';
import { DetalleVenta } from '../../interfaces/venta.intarface';
import { VentaService } from '../../services/venta.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styles: [
  ]
})
export class CartComponent implements OnInit{

  @Input() detalle!: DetalleVenta;
  imagenObservable!: Observable<Blob|undefined>;

  imagenUrl: string = '';
  constructor( private productoService: ProductoService,
               private ventasService: VentaService,
               private router: Router ){}

  ngOnInit(): void {
    if ( !this.detalle.producto ) throw Error('Producto property is required');

    this.productoService.getImgById(this.detalle.producto._id).subscribe(
      blob => {
        if (blob) {
          this.imagenUrl = URL.createObjectURL(blob);
          console.log( this.imagenUrl )
        }
      },
      error => console.error(error)
    );

  }

  agregadosMap = {
    '=1'    : 'Unidad',
    'other' : 'Unidades'
  }

  delete():void {
    this.ventasService.eliminarDetalleVenta( this.detalle );
  }
}
