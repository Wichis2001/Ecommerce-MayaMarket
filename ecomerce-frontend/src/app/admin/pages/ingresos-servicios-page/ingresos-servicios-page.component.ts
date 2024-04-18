import { Component } from '@angular/core';
import { Servicio } from 'src/app/user/interfaces/servicio.interface';
import { IngresoServicioService } from '../../services/ingreso-servicio.service';


@Component({
  selector: 'app-ingresos-servicios-page',
  templateUrl: './ingresos-servicios-page.component.html',
  styles: [
  ]
})
export class IngresosServiciosPageComponent {

  public servicios: Servicio[] = [];

  constructor( private ingresoService: IngresoServicioService ) {}

  ngOnInit(): void {
    this.ingresoService.getServicios()
      .subscribe( servicios =>{
        this.servicios = servicios
      } );
  }
}
