import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Usuario } from 'src/app/auth/interfaces/interfaces';
import { AuthService } from 'src/app/auth/services/auth.service';

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
    cantidad: [ '', [Validators.required, Validators.min( 1 )]]
  });

  usuario:Usuario = this.authService.usuario;

  constructor( private fb: FormBuilder,
               private snackbar: MatSnackBar,
               private authService: AuthService ){}

  compra():void{}
}
