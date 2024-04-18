import { Component, OnInit } from '@angular/core';
import { Producto } from '../../interfaces/producto.intarface';
import { ProductoService } from '../../services/producto.service';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, switchMap } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VentaService } from '../../services/venta.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { CoinDialogComponent } from '../../components/coin-dialog/coin-dialog.component';
import { Usuario } from 'src/app/auth/interfaces/interfaces';
import { AuthService } from 'src/app/auth/services/auth.service';
import Swal from "sweetalert2";
@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styles: [
  ]
})
export class ProductPageComponent implements OnInit{
  public producto!: Producto;
  imagenUrl: string = '';
  usuario:Usuario = this.authService.usuario;

  constructor(
    private productoService: ProductoService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private ventasService: VentaService,
    private snackbar: MatSnackBar,
    private dialog: MatDialog,
    private authService: AuthService
  ) {}

  miFormulario: FormGroup = this.fb.group({
    existenciaLlevar: [ '', [Validators.required, Validators.minLength( 1 )]]
  });

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        switchMap( ({ id }) => this.productoService.getProductoByID( id )),
      )
      .subscribe( producto => {

        if ( !producto ) return this.router.navigate([ '/user/list' ]);

        this.producto = producto;

        this.productoService.getImgById(this.producto!._id).subscribe(
          blob => {
            if (blob) {
              this.imagenUrl = URL.createObjectURL(blob);
              console.log( this.imagenUrl )
            }
          },
          error => console.error(error)
        );
        return;
      })
  }

  goBack():void {
    this.router.navigateByUrl('user/list')
  }

  agregar(): void {
    const existenciaLlevar = this.miFormulario.get('existenciaLlevar')?.value;
    const subTotal = this.producto.precio * existenciaLlevar
    const dialogRef = this.dialog.open( CoinDialogComponent, {
      data: `¿Estás seguro de querer comprar ${ existenciaLlevar } unidades de ${this.producto.nombre} a un total de C${subTotal}?`
    });
    dialogRef.afterClosed()
                .pipe(
                  filter( (result: boolean) => result ),
                )
                .subscribe(() => {
                  if( this.usuario.cacao < subTotal ){
                    Swal.fire( 'Error', `No cuentas con el dinero necesario para poder realizar está transacción`, 'error')
                    this.miFormulario.reset()
                  } else{
                    this.ventasService.generarNuevaVenta( subTotal, this.producto, existenciaLlevar ).subscribe( res => {
                                                            if( res?.error !== undefined){
                                                              this.showSnackbar( res.error )
                                                            } else {
                                                              this.usuario.cacao = res.usuario!.cacao
                                                              this.authService.setUsuario = res.usuario!;
                                                              this.miFormulario.reset();
                                                              this.showSnackbar( res.msg! )
                                                              this.router.navigateByUrl('user/cartera')
                                                            }
                                                            }, error => {
                                                              console.log( error )
                                                              Swal.fire( 'Error', `${ error.error.error }`, 'error')
                                                              this.miFormulario.reset();
                                                            })
                  }
                })
  }

  showSnackbar( message: string ):void {
    this.snackbar.open( message, 'ok', {
      duration: 2500,
    })
  }

}
