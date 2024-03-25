import { Component } from '@angular/core';
import { Usuario } from '../../interfaces/user.interface';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styles: [
  ]
})
export class UserComponent {
  public usuarios: Usuario[] = [];

  constructor( private usuarioService: UsuarioService ) {}

  ngOnInit(): void {
    this.usuarioService.getUsuarios()
      .subscribe( usuarios =>{
        this.usuarios = usuarios
      } );
  }
}
