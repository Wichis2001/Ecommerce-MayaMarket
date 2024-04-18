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
      label: 'Usuarios',
      icon: 'person',
      url: './user'
    },
    {
      label: 'Agregar',
      icon: 'group_add',
      url: './new-account'
    },
    {
      label: 'Aprobar Productos',
      icon: 'inventory_2',
      url: './ingresos'
    },
    {
      label: 'Aprobar Servicios',
      icon: 'diversity_3',
      url: './ingresos-servicios'
    },
    {
      label: 'Reportes Productos',
      icon: 'report',
      url: './reporte-productos'
    },
    {
      label: 'Top 10 Productos Más Vendidos',
      icon: 'plagiarism',
      url: './produtos-vendidos'
    },
    {
      label: 'Top 5 Clientes Más Ganancias',
      icon: 'plagiarism',
      url: './clientes-ganancias'
    },
    {
      label: 'Top 5 Clientes Más Ventas',
      icon: 'plagiarism',
      url: './clientes-ventas'
    },
    {
      label: 'Top 10 Clientes Más Servicios Ofrecidos',
      icon: 'diversity_3',
      url: './clientes-servicios-ofrecidos'
    },
    {
      label: 'Top 10 Clientes Más Servicios Asignados',
      icon: 'diversity_3',
      url: './clientes-servicios'
    }
  ]

  constructor( private authService: AuthService,
               private router: Router) {}

  logOut():void {
    this.authService.logOut();
    this.router.navigate(['/auth']);
  }
}
