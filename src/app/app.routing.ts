import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Import Containers
import { DefaultLayoutComponent } from './layout';

import { P404Component } from './views/error/404.component';
import { P500Component } from './views/error/500.component';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'commons',
    pathMatch: 'full',
  },
  {
    path: '404',
    component: P404Component,
    data: {
      title: 'Page 404'
    }
  },
  {
    path: '500',
    component: P500Component,
    data: {
      title: 'Page 500'
    }
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login Page'
    }
  },
  {
    path: 'register',
    component: RegisterComponent,
    data: {
      title: 'Register Page'
    }
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'Home'
    },
    children: [
      {
        path: 'commons',
        loadChildren: () => import('./pages/commons/common-pages.module').then(m => m.CommonsPagesModule)
      },
      {
        path: 'usuarios',
        loadChildren: () => import('./pages/usuarios/usuarios.module').then(m => m.UsuariosModule)
      },
      {
        path: 'recursos-humanos',
        loadChildren: () => import('./pages/recursos-humanos/recursos-humanos.module').then(m => m.RecursosHumanosModule)
      },
      {
        path: 'contabilidad',
        loadChildren: () => import('./pages/contabilidad/contabilidad.module').then(m => m.ContabilidadModule)
      },
      {
        path: 'tesoreria',
        loadChildren: () => import('./pages/tesoreria/tesoreria.module').then(m => m.TesoreriaModule)
      },
      {
        path: 'gerencia',
        loadChildren: () => import('./pages/gerencia/gerencia.module').then(m => m.GerenciaModule)
      },
      {
        path: 'administracion',
        loadChildren: () => import('./pages/administracion/administracion.module').then(m => m.AdministracionModule)
      }
    ]
  },
  { path: '**', component: P404Component }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
