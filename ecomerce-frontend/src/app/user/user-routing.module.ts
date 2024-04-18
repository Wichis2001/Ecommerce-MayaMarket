import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { SalePageComponent } from './pages/sale-page/sale-page.component';
import { ListPageComponent } from './pages/list-page/list-page.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { CardComponent } from './components/card/card.component';
import { ProductPageComponent } from './pages/product-page/product-page.component';
import { AddPageComponent } from './pages/add-page/add-page.component';
import { CarteraPageComponent } from './pages/cartera-page/cartera-page.component';
import { MisServiciosPageComponent } from './pages/mis-servicios-page/mis-servicios-page.component';
import { ServiciosPageComponent } from './pages/servicios-page/servicios-page.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutPageComponent,
    children: [
      {
        path: 'my-services',
        component: MisServiciosPageComponent
      },
      {
        path: 'services',
        component: ServiciosPageComponent
      },
      {
        path: 'cartera',
        component: CarteraPageComponent
      },
      {
        path: 'sales',
        component: SalePageComponent
      },
      {
        path: 'new-sale',
        component: AddPageComponent
      },
      {
        path: 'edit/:id',
        component: AddPageComponent
      },
      {
        path: 'list',
        component: ListPageComponent
      },
      {
        path: 'search',
        component: SearchPageComponent
      },
      {
        path: ':id',
        component: ProductPageComponent
      },
      {
        path: '**',
        redirectTo: 'list'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
