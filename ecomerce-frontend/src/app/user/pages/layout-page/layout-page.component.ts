import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/auth/interfaces/interfaces';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-layout-page',
  templateUrl: './layout-page.component.html',
  styles: [
  ]
})
export class LayoutPageComponent {

  usuario:Usuario = this.authService.usuario;

  public sidebarItems = [
    {
      label: 'Productos',
      icon: 'shopping_bag',
      url: './list'
    },
    {
      label: 'Buscar',
      icon: 'search',
      url: './search'
    },
    {
      label: 'Cartera',
      icon: 'wallet',
      url: './cartera'
    },
    {
      label: 'Vender',
      icon: 'add',
      url: './new-sale'
    },
    {
      label: 'Ventas',
      icon: 'paid',
      url: './sales'
    },
    {
      label: 'Servicios',
      icon: 'attribution',
      url: './services'
    },
    {
      label: 'Administrar Servicios',
      icon: 'groups_3',
      url: './my-services'
    }
  ]

  constructor( private authService: AuthService,
               private router: Router) {}

  logOut():void {
    this.authService.logOut();
    this.router.navigate(['/auth']);
  }
}
