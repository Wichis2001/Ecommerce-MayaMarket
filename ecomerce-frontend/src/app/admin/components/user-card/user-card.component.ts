import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { Usuario } from '../../interfaces/user.interface';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styles: [
  ]
})
export class UserCardComponent {
  @Input() usuario!: Usuario;

  constructor(
    private snackbar: MatSnackBar,
    private usuarioService: UsuarioService,
    private router: Router,
    private cdRef: ChangeDetectorRef
  ){}

  ngOnInit(): void {
    if (!this.usuario) throw Error('Usuario property is required');
  }

  aprobar(): void {
    this.usuarioService.aprobarUsuarios(this.usuario).subscribe(res => {
      this.showSnackbar('Usuario aprobado correctamente');
      // Recargar la ruta actual
      window.location.reload();
    });
  }

  rechazar(): void {
    this.usuarioService.rechazarUsuarios(this.usuario).subscribe(res => {
      this.showSnackbar('Usuario rechazado correctamente');
      // Recargar la ruta actual
      window.location.reload();
    });
  }

  showSnackbar(message: string): void {
    this.snackbar.open(message, 'ok', {
      duration: 2500,
    });
  }

  reloadCurrentRoute(): void {

  }
}
