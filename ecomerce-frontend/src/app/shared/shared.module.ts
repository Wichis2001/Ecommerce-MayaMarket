import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Error404PageComponent } from './pages/error404-page/error404-page.component';
import { Error400PageComponent } from './pages/error400-page/error400-page.component';
import { Error500PageComponent } from './pages/error500-page/error500-page.component';
import { Error401PageComponent } from './pages/error401-page/error401-page.component';



@NgModule({
  declarations: [
    Error404PageComponent,
    Error400PageComponent,
    Error500PageComponent,
    Error401PageComponent,

  ],
  imports: [
    CommonModule
  ],
  exports: [
    Error400PageComponent,
    Error401PageComponent,
    Error404PageComponent,
    Error500PageComponent
  ]
})
export class SharedModule { }
