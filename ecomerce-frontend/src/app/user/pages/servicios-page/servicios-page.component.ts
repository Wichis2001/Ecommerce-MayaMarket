import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, MinValidator, ValidationErrors, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Categoria, Producto, TipoCategoria } from '../../interfaces/producto.intarface';
import { filter, switchMap } from 'rxjs';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';


import Swal from 'sweetalert2';
import { FileUploadService } from '../../services/file-upload.service';
import { MatSelect } from '@angular/material/select';
import { ServicioService } from '../../services/servicio.service';
import { Servicio } from '../../interfaces/servicio.interface';


@Component({
  selector: 'app-servicios-page',
  templateUrl: './servicios-page.component.html',
  styles: [
  ]
})
export class ServiciosPageComponent {
  public imagenSubir!: File;
  public imgTemp: any = null;
  public serviceTmp!: Servicio;


  miFormulario: FormGroup = this.fb.group({
          _id:          [''],
          nombre:       ['', [Validators.required, Validators.minLength(4)]],
          descripcion:  ['', [Validators.required, Validators.minLength(10)]],
          pago:         new FormControl<number>(1, {
                            validators: [Validators.required, Validators.min(1)]
                        }),
  });

  constructor( private servicioService: ServicioService,
               private activatedRoute: ActivatedRoute,
               private router: Router,
               private snackbar: MatSnackBar,
               private dialog: MatDialog,
               private fb: FormBuilder,
               private fileService: FileUploadService) {}

  get currentService(): Servicio {
    const servicio = this.miFormulario.value as Servicio;
    return servicio;
  }

  ngOnInit(): void {

    this.serviceTmp = this.currentService;
    if ( !this.router.url.includes('services-edit') ) return;

    this.activatedRoute.params
      .pipe(
        switchMap( ({ id }) => this.servicioService.getServicioByID( id ) ),
      ).subscribe( servicio => {

        if ( !servicio ) {
          return this.router.navigateByUrl('/sales');
        }
        this.serviceTmp = servicio;

        this.miFormulario.reset( servicio );

        return;

      });

  }

  onSubmit() {
    if ( this.miFormulario.invalid ) return;

    if ( this.currentService._id ) {
      this.servicioService.updateServicio( this.currentService )
                            .subscribe( servicio => {
                              this.actualizarImagen( servicio );
                              this.showSnackbar( `${ servicio.nombre } actualizado correctamente!`)
                            });
      return;
    }

    this.servicioService.addServicio( this.currentService )
      .subscribe( servicio => {
       // TODO: mostrar snackbar, y navegar a /heroes/edit/ hero.id
       this.actualizarImagen( servicio );
       this.router.navigate(['/user/services-edit', servicio._id ]);
       console.log('NOS FUIMOS -------------------')
       this.showSnackbar(`${ servicio.nombre } creado con éxito!`);

      });


  }

  onDeleteProducto() {
    if ( !this.currentService._id ) throw Error('Producto id is required');

    const dialogRef = this.dialog.open( ConfirmDialogComponent, {
      data: this.miFormulario.value
    });

    dialogRef.afterClosed()
      .pipe(
        filter( (result: boolean) => result ),
        switchMap( () => this.servicioService.deleteServicioById( this.currentService._id )),
        filter( (wasDeleted: boolean) => wasDeleted ),
      )
      .subscribe(() => {
        this.router.navigate(['/user/sales']);
      });


  }

  actualizarImagen( servicio: Servicio ){
    if( this.imgTemp ){
      this.fileService.actualizarImagenServicio( servicio, this.imagenSubir )
                                  .subscribe( ok => {
                                    if( ok === true ){
                                      this.serviceTmp.img = this.fileService.nombreArchivo;

                                    }else{

                                      Swal.fire( 'Error', ok, 'error');
                                    }
      })
    }
  }

  showSnackbar( message: string ):void {
    this.snackbar.open( message, 'ok', {
      duration: 2500,
    })
  }

  cambiarImagen( event: any ) {
    // El archivo seleccionado es una imagen
    if (event.target.files.length > 0) {
      const selectedFile = event.target.files[0];
      if (selectedFile.type.indexOf('image') !== -1) {
        this.imagenSubir = selectedFile;
        const reader = new FileReader();
        reader.readAsDataURL( selectedFile );

        reader.onloadend = () => {
          this.imgTemp = reader.result;
        }
        this.showSnackbar('Imagen cargada correctamente')

      } else {
        // El archivo seleccionado no es una imagen
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'El archivo seleccionado no tiene un formato valido',
        })
        this.imgTemp = null;
      }
      //this.imagenSubir = event.target.files[0];


    } else {
      this.imgTemp = null;
    }

  }
}
