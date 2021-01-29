import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SaldosUsuarioComponent } from '../commons/saldos-usuario/saldos-usuario.component';
import { TramitesAhorroComponent } from './tramites-ahorro/tramites-ahorro.component';
import { PagosPrestamosComponent } from './pagos-prestamos/pagos-prestamos.component';
import { TramitesPrestamoComponent } from './tramites-prestamo/tramites-prestamo.component';
import { AprobacionAvalComponent } from './aprobacion-aval/aprobacion-aval.component';
import { PrestamosUsuarioComponent } from './prestamos-usuario/prestamos-usuario.component';

const routes: Routes = [
  {
    path: 'reportes',
    component: SaldosUsuarioComponent,
    data: {
      title: 'Historico'
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
    path: 'pagos',
    component: PagosPrestamosComponent,
    data: {
      title: 'Pagos anticipados'
    }
  },
  {
    path: 'prestamos-activos',
    component: PrestamosUsuarioComponent,
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
