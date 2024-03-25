import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import Swal from "sweetalert2";

import { AuthService } from '../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: [ './register-page.component.css' ]
})
export class RegisterPageComponent {

  miFormulario: FormGroup = this.fb.group({
    nombre:   [ '', [Validators.required] ],
    password: [ '', [Validators.required, Validators.minLength( 6 )]]
  });

  constructor( private fb: FormBuilder,
               private router: Router,
               private authService: AuthService,
               private snackbar: MatSnackBar ) {}

  registro(){
    const { nombre, password } = this.miFormulario.value;

    this.authService.registro( nombre, password )
                        .subscribe( ok => {
                          if( ok === true ){
                            this.showSnackbar(`${this.authService.usuario.nombre[0].toUpperCase()}${this.authService.usuario.nombre.substring(1)} ha sido enviado al administrador para aprobación, espera a ser aprobado en el sistema`);

                            this.router.navigateByUrl('/auth');

                          }else{

                            Swal.fire( 'Error', `El username: ${ nombre } ya se encuentra registrado`, 'error')
                          }
                        })
  }

  showSnackbar( message: string ): void{
    this.snackbar.open( message, 'ok', {
      duration: 3500
    })
  }
}
