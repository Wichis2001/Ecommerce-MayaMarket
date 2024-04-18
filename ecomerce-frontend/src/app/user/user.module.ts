import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '../material/material.module';
import { UserRoutingModule } from './user-routing.module';

import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { ListPageComponent } from './pages/list-page/list-page.component';
import { SalePageComponent } from './pages/sale-page/sale-page.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { CardComponent } from './components/card/card.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductPageComponent } from './pages/product-page/product-page.component';
import { SellCardComponent } from './components/sell-card/sell-card.component';
import { AddPageComponent } from './pages/add-page/add-page.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { ProductoImagenPipe } from './pipes/producto-imagen.pipe';
import { TarjetaDialogComponent } from './components/tarjeta-dialog/tarjeta-dialog.component';
import { ServiciosPageComponent } from './pages/servicios-page/servicios-page.component';
import { MisServiciosPageComponent } from './pages/mis-servicios-page/mis-servicios-page.component';
import { CarteraPageComponent } from './pages/cartera-page/cartera-page.component';
import { CoinDialogComponent } from './components/coin-dialog/coin-dialog.component';
import { ServicioImagenPipe } from './pipes/servicio-imagen.pipe';
import { CardServiceComponent } from './components/card-service/card-service.component';
import { CardServiceSellComponent } from './components/card-service-sell/card-service-sell.component';
import { ListServicesPageComponent } from './pages/list-services-page/list-services-page.component';
import { ServicesOptadosPageComponent } from './pages/services-optados-page/services-optados-page.component';

@NgModule({
  declarations: [
    LayoutPageComponent,
    ListPageComponent,
    SalePageComponent,
    SearchPageComponent,
    CardComponent,
    ProductPageComponent,
    SellCardComponent,
    AddPageComponent,
    ConfirmDialogComponent,
    ProductoImagenPipe,
    TarjetaDialogComponent,
    ServiciosPageComponent,
    MisServiciosPageComponent,
    CarteraPageComponent,
    CoinDialogComponent,
    ServicioImagenPipe,
    CardServiceComponent,
    CardServiceSellComponent,
    ListServicesPageComponent,
    ServicesOptadosPageComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class UserModule { }
