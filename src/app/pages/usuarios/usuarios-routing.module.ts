import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AhorroUsuarioComponent } from '../commons/ahorro-usuario/ahorro-usuario.component';
import { TramitesAhorroComponent } from './tramites-ahorro/tramites-ahorro.component';
import { TramitesPrestamoComponent } from './tramites-prestamo/tramites-prestamo.component';
import { AprobacionAvalComponent } from './aprobacion-aval/aprobacion-aval.component';
import { PrestamoUsuarioComponent } from '../commons/prestamo-usuario/prestamo-usuario.component';

const routes: Routes = [
  {
    path: 'reportes',
    component: AhorroUsuarioComponent,
    data: {
      title: 'Mi ahorro'
    }
  },
  {
    path: 'tramites',
    component: TramitesAhorroComponent,
    data: {
      title: 'Trámites ahorro'
    }
  },
  {
    path: 'prestamos',
    component: TramitesPrestamoComponent,
    data: {
      title: 'Trámites ahorro'
    }
  },
  {
    path: 'prestamos-activos',
    component: PrestamoUsuarioComponent,
    data: {
      title: 'Mis prestamos'
    }
  },
  {
    path: 'avales',
    component: AprobacionAvalComponent,
    data: {
      title: 'Aprobaciones de aval'
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuariosRoutingModule { }
