import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Import Containers
import { DefaultLayoutComponent } from './layout';

import { Error400Component } from './pages/errores/error400/error400.component';
import { Error500Component } from './pages/errores/error500/error500.component';
import { UsuarioCaducadoComponent } from './pages/errores/usuario-caducado/usuario-caducado.component';
import { UsuarioInvalidoComponent } from './pages/errores/usuario-invalido/usuario-invalido.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'commons',
    pathMatch: 'full',
  },
  {
    path: '404',
    component: Error400Component,
    data: {
      title: 'Page 404'
    }
  },
  {
    path: '500',
    component: Error500Component,
    data: {
      title: 'Page 500'
    }
  },
  {
    path: 'login',
    component: UsuarioCaducadoComponent,
    data: {
      title: 'Login Page'
    }
  },
  {
    path: 'register',
    component: UsuarioInvalidoComponent,
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
        path: 'gerencia-interna',
        loadChildren: () => import('./pages/gerencia-interna/gerencia-interna.module').then(m => m.GerenciaInternaModule)
      },
      {
        path: 'gerencia-externa',
        loadChildren: () => import('./pages/gerencia-externa/gerencia-externa.module').then(m => m.GerenciaExternaModule)
      },
      {
        path: 'direccion',
        loadChildren: () => import('./pages/direccion/direccion.module').then(m => m.DireccionModule)
      },
      {
        path: 'administracion',
        loadChildren: () => import('./pages/administracion/administracion.module').then(m => m.AdministracionModule)
      }
    ]
  },
  { path: '**', component: Error400Component }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
