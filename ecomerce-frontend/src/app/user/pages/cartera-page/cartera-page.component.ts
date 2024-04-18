import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Usuario } from 'src/app/auth/interfaces/interfaces';
import { AuthService } from 'src/app/auth/services/auth.service';
import { CoinService } from '../../services/coin.service';

import Swal from "sweetalert2";
import { CoinManagment, CoinResponse } from '../../interfaces/coin.interface';
import { MatDialog } from '@angular/material/dialog';
import { CoinDialogComponent } from '../../components/coin-dialog/coin-dialog.component';
import { CurrencyPipe } from '@angular/common';
import { filter } from 'rxjs';

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

  usuario:Usuario = this.authService.usuario;
  miFormulario: FormGroup = this.fb.group({
    cantidadQuetzales: [ '', [Validators.required, Validators.min( 1 )]]
  });

  miFormularioCacao: FormGroup = this.fb.group({
    cantidadCacao: [ '', [Validators.required, Validators.min( 1 )]]
  });



  constructor( private fb: FormBuilder,
               private snackbar: MatSnackBar,
               private authService: AuthService,
               private coinService: CoinService,
               private dialog: MatDialog ){}

  compraQuetzales():void {
    const { cantidadQuetzales } = this.miFormulario.value;
    if( isNaN( cantidadQuetzales )){
      Swal.fire( 'Error', `No es posible realizar el deposito de quetzales`, 'error')
      this.miFormulario.reset();
    } else {
      const dialogRef = this.dialog.open( CoinDialogComponent, {
        data: `¿Estás seguro de depositar Q${ cantidadQuetzales } a tu cuenta?`
      });

      dialogRef.afterClosed()
                .pipe(
                  filter( (result: boolean) => result ),
                )
                .subscribe(() => {
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
                                                        }, error => {
                                                          console.log( error )
                                                          Swal.fire( 'Error', `${ error.error.error }`, 'error')
                                                          this.miFormulario.reset();
                                                        })
                });

    }
  }

  compraCacaoCoins():void {
    const { cantidadQuetzales } = this.miFormulario.value;
    if( isNaN( cantidadQuetzales )){
      Swal.fire( 'Error', `No es posible realizar el cambio de moneda`, 'error')
      this.miFormulario.reset();
    } else {
      const cacao:number = cantidadQuetzales * 5
      const quetzal:number = cantidadQuetzales
      const dialogRef = this.dialog.open( CoinDialogComponent, {
        data: `¿Estás seguro de depositar C${ cacao } a tu cuenta por Q${ cantidadQuetzales }?`
      });

      dialogRef.afterClosed()
                .pipe(
                  filter( (result: boolean) => result ),
                )
                .subscribe(() => {
                  this.coinService.intercambiarCacao( cantidadQuetzales )
                                                        .subscribe( res => {
                                                          if( res?.error !== undefined){
                                                            console.log('entre')
                                                            Swal.fire( 'Error', `${ res.error }`, 'error')
                                                          } else {
                                                            this.usuario.quetzal = res.usuario!.quetzal
                                                            this.usuario.cacao = res.usuario!.cacao
                                                            this.authService.setUsuario = res.usuario!;
                                                            this.miFormulario.reset();
                                                            this.showSnackbar( res.msg! )
                                                          }
                                                        }, error => {
                                                          console.log( error )
                                                          Swal.fire( 'Error', `${ error.error.error }`, 'error')
                                                          this.miFormulario.reset();
                                                        })
                });

    }
  }

  intercambiarQuetzales():void {
    const { cantidadCacao } = this.miFormularioCacao.value;
    if( isNaN( cantidadCacao )){
      Swal.fire( 'Error', `No es posible realizar el cambio de moneda`, 'error')
      this.miFormularioCacao.reset();
    } else {
      const cacao:number = cantidadCacao
      const quetzal:number = cantidadCacao / 5
      const dialogRef = this.dialog.open( CoinDialogComponent, {
        data: `¿Estás seguro de transferirte Q${ quetzal } a tu cuenta por C${ cacao }?`
      });

      dialogRef.afterClosed()
                .pipe(
                  filter( (result: boolean) => result ),
                )
                .subscribe(() => {
                  this.coinService.depositarUsuarioQuetzal( cantidadCacao )
                                                        .subscribe( res => {
                                                          if( res?.error !== undefined){
                                                            console.log('entre')
                                                            Swal.fire( 'Error', `${ res.error }`, 'error')
                                                          } else {
                                                            this.usuario.quetzal = res.usuario!.quetzal
                                                            this.usuario.cacao = res.usuario!.cacao
                                                            this.authService.setUsuario = res.usuario!;
                                                            this.miFormularioCacao.reset();
                                                            this.showSnackbar( res.msg! )
                                                          }
                                                        }, error => {
                                                          console.log( error )
                                                          Swal.fire( 'Error', `${ error.error.error }`, 'error')
                                                          this.miFormularioCacao.reset();
                                                        })
                });

    }
  }
  showSnackbar( message: string ): void{
    this.snackbar.open( message, 'ok', {
      duration: 3500
    })
  }

}
