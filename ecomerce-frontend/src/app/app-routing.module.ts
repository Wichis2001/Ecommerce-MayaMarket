import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { Error400PageComponent } from './shared/pages/error400-page/error400-page.component';
import { Error401PageComponent } from './shared/pages/error401-page/error401-page.component';
import { Error404PageComponent } from './shared/pages/error404-page/error404-page.component';
import { Error500PageComponent } from './shared/pages/error500-page/error500-page.component';
import { ValidarTokenGuard } from './guards/validar-token.guard';


const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then( m => m.AuthModule)
  },
  {
    path: 'user',
    loadChildren: () => import('./user/user.module').then( m => m.UserModule),
    canActivate: [ ValidarTokenGuard ],
    canLoad: [ ValidarTokenGuard ]
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then( m => m.AdminModule),
    canActivate: [ ValidarTokenGuard ],
    canLoad: [ ValidarTokenGuard ]
  },
  {
    path: '400',
    component: Error400PageComponent
  },
  {
    path: '401',
    component: Error401PageComponent
  },
  {
    path: '404',
    component: Error404PageComponent
  },
  {
    path: '500',
    component: Error500PageComponent
  },
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '404'
  }
];
@NgModule({

  imports: [ RouterModule.forRoot( routes ) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
