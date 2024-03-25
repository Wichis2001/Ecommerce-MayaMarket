import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { TarjetaDialogComponent } from '../../components/tarjeta-dialog/tarjeta-dialog.component';
import { filter, switchMap } from 'rxjs';
import { TarjetaService } from '../../services/tarjeta.service';
import { VentaService } from '../../services/venta.service';
import { Tarjeta } from '../../interfaces/tarjeta.interface';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-shopping-page',
  templateUrl: './shopping-page.component.html',
  styles: [
  ]
})
export class ShoppingPageComponent implements OnInit{
  private validador: boolean = false;
  miFormulario: FormGroup = this.fb.group({
    tarjeta: ['', [Validators.required, Validators.pattern(/^[0-9*]{16}$/)]]
  });

  get currentTarjeta(): Tarjeta {
    const tarjeta = this.miFormulario.value as Tarjeta;
    return tarjeta;
  }


  constructor( private fb: FormBuilder,
               private dialog: MatDialog,
               private tarjetaService: TarjetaService,
               private ventaService: VentaService,
               private router: Router,
               private snackbar: MatSnackBar ) {}

  ngOnInit(): void {
    this.tarjetaService.getTarjeta( ).subscribe( tarjetero => {
      console.log( tarjetero )
      if( tarjetero.tarjeta === 'NO HAY' ){
        this.validador = true;
      } else {
        this.miFormulario.reset( tarjetero )
      }
    })
  }

  onSubmit() {
    if ( this.miFormulario.invalid ) return;


    if( this.validador ){
      const dialogRef = this.dialog.open( TarjetaDialogComponent );
      dialogRef.afterClosed()
        .pipe(
          filter( (result: boolean) => result ),
          switchMap( () => this.tarjetaService.postTarjeta( this.currentTarjeta )),
          filter( (wasDeleted: boolean) => wasDeleted ),
        )
        .subscribe(() => {

        });
    }

    this.ventaService.postVenta().subscribe( res => {
      this.ventaService.reiniciarVariables();
      this.showSnackbar('Compra realizada correctamente')
      this.router.navigate(['/user/list']);
    })




  }

  showSnackbar( message: string ):void {
    this.snackbar.open( message, 'ok', {
      duration: 2500,
    })
  }
}
