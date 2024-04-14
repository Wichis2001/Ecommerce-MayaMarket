import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, MinValidator, ValidationErrors, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/auth/services/auth.service';
import { AgregarConfirmComponent } from '../../components/agregar-confirm/agregar-confirm.component';
import { filter, switchMap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';


import Swal from "sweetalert2";
import { Router } from '@angular/router';
@Component({
  selector: 'app-add-page',
  templateUrl: './add-page.component.html',
  styles: [
  ]
})
export class AddPageComponent {
  miFormulario: FormGroup = this.fb.group({
    nombre:       ['', [Validators.required, Validators.minLength(4)]],
    password:  ['', [Validators.required, Validators.minLength(6)]]
  });

  constructor( private fb: FormBuilder,
               private authService: AuthService,
               private dialog: MatDialog,
               private router: Router,
               private snackbar: MatSnackBar)
   {}

  onSubmit() {

    const { nombre, password } = this.miFormulario.value;



    const dialogRef = this.dialog.open( AgregarConfirmComponent, {
      data: this.miFormulario.value
    });

    dialogRef.afterClosed()
      .pipe(
        filter( (result: boolean) => result ),
      )
      .subscribe(() => {
        this.authService.registrarAdministrador( nombre, password )
                        .subscribe( ok => {
                          if( ok === true ){
                            this.showSnackbar(`${ nombre } ya tiene acceso al sistema`);

                            this.router.navigate(['/admin/user']);

                          }else{

                            Swal.fire( 'Error', `El username: ${ nombre } ya se encuentra registrado`, 'error')
                          }
                        })
      });
  }

  showSnackbar( message: string ):void {
    this.snackbar.open( message, 'ok', {
      duration: 2500,
    })
  }

}
