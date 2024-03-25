import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AddPageComponent } from './pages/add-page/add-page.component';
import { UserComponent } from './pages/user/user.component';
import { ProductosMasVendidosComponent } from './pages/productos-mas-vendidos/productos-mas-vendidos.component';
import { ClientesMasGananciasComponent } from './pages/clientes-mas-ganancias/clientes-mas-ganancias.component';
import { ClientesMasProductosVendidosComponent } from './pages/clientes-mas-productos-vendidos/clientes-mas-productos-vendidos.component';
import { ClientesMasProductosEnVentaComponent } from './pages/clientes-mas-productos-en-venta/clientes-mas-productos-en-venta.component';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { ClientesMasServiciosAsignadosComponent } from './pages/clientes-mas-servicios-asignados/clientes-mas-servicios-asignados.component';
import { ClientesMasServiciosOfrecidosComponent } from './pages/clientes-mas-servicios-ofrecidos/clientes-mas-servicios-ofrecidos.component';
import { IngresosPageComponent } from './pages/ingresos-page/ingresos-page.component';
import { ReporteProductosComponent } from './pages/reporte-productos/reporte-productos.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutPageComponent,
    children: [
      {
        path: 'new-account',
        component: AddPageComponent
      },
      {
        path: 'user',
        component: UserComponent
      },
      {
        path: 'produtos-vendidos',
        component: ProductosMasVendidosComponent
      },
      {
        path: 'clientes-ganancias',
        component: ClientesMasGananciasComponent
      },
      {
        path: 'clientes-ventas',
        component: ClientesMasProductosVendidosComponent
      },
      {
        path: 'clientes-productos',
        component: ClientesMasProductosEnVentaComponent
      },
      {
        path: 'clientes-servicios',
        component: ClientesMasServiciosAsignadosComponent
      },
      {
        path: 'clientes-servicios-ofrecidos',
        component: ClientesMasServiciosOfrecidosComponent
      },
      {
        path: 'ingresos',
        component: IngresosPageComponent
      },
      {
        path: 'reporte-productos',
        component: ReporteProductosComponent
      },
      {
        path: 'edit/:id',
        component: AddPageComponent
      },
      {
        path: '**',
        redirectTo: 'user'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
