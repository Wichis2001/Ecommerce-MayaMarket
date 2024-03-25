import { Component, Input, OnInit } from '@angular/core';
import { Producto } from '../../interfaces/producto.intarface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductoService } from '../../services/producto.service';
import { Observable } from 'rxjs';
import { VentaService } from '../../services/venta.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styles: [
  ]
})
export class CardComponent implements OnInit {

  @Input() producto!: Producto;
  imagenObservable!: Observable<Blob|undefined>;

  miFormulario: FormGroup = this.fb.group({
    existenciaLlevar: [ '', [Validators.required, Validators.min( 1 )]]
  });

  imagenUrl: string = '';
  constructor( private fb: FormBuilder,
               private snackbar: MatSnackBar,
               private productoService: ProductoService,
               private ventasService: VentaService ){}

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

  agregar(): void {
    const existenciaLlevar = this.miFormulario.get('existenciaLlevar')?.value;
    const subTotal = this.producto.precio * existenciaLlevar
    this.ventasService.agregarDetalleVenta( this.producto, subTotal, existenciaLlevar );
    this.showSnackbar(`${ this.producto.nombre } agregar correctamente`)
  }

  showSnackbar( message: string ):void {
    this.snackbar.open( message, 'ok', {
      duration: 2500,
    })
  }



}
