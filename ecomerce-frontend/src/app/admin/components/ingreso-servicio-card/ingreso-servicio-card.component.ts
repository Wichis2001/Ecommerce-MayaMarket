import { Component, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { Servicio } from 'src/app/user/interfaces/servicio.interface';
import { ProductoService } from 'src/app/user/services/producto.service';
import { IngresoServicioService } from '../../services/ingreso-servicio.service';
import { Router } from '@angular/router';
import { ServicioService } from 'src/app/user/services/servicio.service';

@Component({
  selector: 'app-ingreso-servicio-card',
  templateUrl: './ingreso-servicio-card.component.html',
  styles: [
  ]
})
export class IngresoServicioCardComponent {
  @Input() service!: Servicio;
  imagenObservable!: Observable<Blob|undefined>;
  imagenUrl: string = '';

  constructor( private snackbar: MatSnackBar,
               private servicioService: ServicioService,
               private ingresoService: IngresoServicioService,
               private router: Router ){}

  ngOnInit(): void {
    if ( !this.service ) throw Error('Producto property is required');

    this.servicioService.getImgById(this.service._id).subscribe(
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
    this.ingresoService.aprobarServicio( this.service ).subscribe( res => {
      this.showSnackbar('Servicio aprobado correctamente');
      window.location.reload();
    })
  }

  rechazar(): void{
    this.ingresoService.rechazar( this.service ).subscribe( res => {
      this.showSnackbar('Servicio rechazado correctamente');
      window.location.reload();
    })
  }

  showSnackbar( message: string ):void {
    this.snackbar.open( message, 'ok', {
      duration: 2500,
    })
  }
}
