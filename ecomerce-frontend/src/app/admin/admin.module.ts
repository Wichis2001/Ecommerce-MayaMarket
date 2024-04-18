import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { AddPageComponent } from './pages/add-page/add-page.component';
import { UserComponent } from './pages/user/user.component';
import { MaterialModule } from '../material/material.module';
import { ProductosMasVendidosComponent } from './pages/productos-mas-vendidos/productos-mas-vendidos.component';
import { ClientesMasGananciasComponent } from './pages/clientes-mas-ganancias/clientes-mas-ganancias.component';
import { ClientesMasProductosVendidosComponent } from './pages/clientes-mas-productos-vendidos/clientes-mas-productos-vendidos.component';
import { ClientesMasProductosEnVentaComponent } from './pages/clientes-mas-productos-en-venta/clientes-mas-productos-en-venta.component';
import { ReactiveFormsModule } from '@angular/forms';
import { IngresoCardComponent } from './components/ingreso-card/ingreso-card.component';
import { IngresosPageComponent } from './pages/ingresos-page/ingresos-page.component';
import { ClientesMasServiciosOfrecidosComponent } from './pages/clientes-mas-servicios-ofrecidos/clientes-mas-servicios-ofrecidos.component';
import { ClientesMasServiciosAsignadosComponent } from './pages/clientes-mas-servicios-asignados/clientes-mas-servicios-asignados.component';
import { ReporteProductosComponent } from './pages/reporte-productos/reporte-productos.component';
import { UserCardComponent } from './components/user-card/user-card.component';
import { AgregarConfirmComponent } from './components/agregar-confirm/agregar-confirm.component';
import { IngresosServiciosPageComponent } from './pages/ingresos-servicios-page/ingresos-servicios-page.component';
import { IngresoServicioCardComponent } from './components/ingreso-servicio-card/ingreso-servicio-card.component';



@NgModule({
  declarations: [
    LayoutPageComponent,
    AddPageComponent,
    UserComponent,
    ProductosMasVendidosComponent,
    ClientesMasGananciasComponent,
    ClientesMasProductosVendidosComponent,
    ClientesMasProductosEnVentaComponent,
    IngresoCardComponent,
    IngresosPageComponent,
    ClientesMasServiciosOfrecidosComponent,
    ClientesMasServiciosAsignadosComponent,
    ReporteProductosComponent,
    UserCardComponent,
    AgregarConfirmComponent,
    IngresosServiciosPageComponent,
    IngresoServicioCardComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class AdminModule { }
