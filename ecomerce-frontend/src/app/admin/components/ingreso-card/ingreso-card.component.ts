import { Component, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { Producto } from 'src/app/user/interfaces/producto.intarface';
import { ProductoService } from 'src/app/user/services/producto.service';
import { IngresosService } from '../../services/ingresos.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ingreso-card',
  templateUrl: './ingreso-card.component.html',
  styles: [
  ]
})
export class IngresoCardComponent {

  @Input() producto!: Producto;
  imagenObservable!: Observable<Blob|undefined>;
  imagenUrl: string = '';

  constructor( private snackbar: MatSnackBar,
               private productoService: ProductoService,
               private ingresoService: IngresosService,
               private router: Router ){}

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

  aprobar(): void {
    this.ingresoService.aprobarProducto( this.producto ).subscribe( res => {
      this.showSnackbar('Producto aprobado correctamente');
      window.location.reload();
    })
  }

  rechazar(): void{
    this.ingresoService.rechazar( this.producto ).subscribe( res => {
      this.showSnackbar('Producto rechazado correctamente');
      window.location.reload();
    })
  }

  showSnackbar( message: string ):void {
    this.snackbar.open( message, 'ok', {
      duration: 2500,
    })
  }


}
