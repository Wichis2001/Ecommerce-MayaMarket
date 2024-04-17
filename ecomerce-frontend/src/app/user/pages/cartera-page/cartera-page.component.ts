import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Usuario } from 'src/app/auth/interfaces/interfaces';
import { AuthService } from 'src/app/auth/services/auth.service';
import { CoinService } from '../../services/coin.service';

import Swal from "sweetalert2";
import { CoinManagment, CoinResponse } from '../../interfaces/coin.interface';

@Component({
  selector: 'app-cartera-page',
  templateUrl: './cartera-page.component.html',
  styles: [`
    p {
      text-align: justify;
    }
  `]
})
export class CarteraPageComponent {

  miFormulario: FormGroup = this.fb.group({
    cantidadQuetzales: [ '', [Validators.required, Validators.min( 1 )]]
  });

  usuario:Usuario = this.authService.usuario;

  constructor( private fb: FormBuilder,
               private snackbar: MatSnackBar,
               private authService: AuthService,
               private coinService: CoinService ){}

  compraQuetzales():void {
    const { cantidadQuetzales } = this.miFormulario.value;
    if( isNaN( cantidadQuetzales )){
      Swal.fire( 'Error', `No es posible realizar el deposito de quetzales`, 'error')
    } else{
      this.coinService.intercambiarQuetzales( cantidadQuetzales )
                                              .subscribe( res => {
                                                if( res?.error !== undefined){
                                                  this.showSnackbar( res.error )
                                                } else {
                                                  this.usuario.quetzal = res.usuario!.quetzal
                                                  this.authService.setUsuario = res.usuario!;
                                                  this.miFormulario.reset();
                                                  this.showSnackbar( res.msg! )
                                                }
                                              })
    }
  }

  showSnackbar( message: string ): void{
    this.snackbar.open( message, 'ok', {
      duration: 3500
    })
  }
}
