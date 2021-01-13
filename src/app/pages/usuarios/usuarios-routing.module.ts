import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReporteAhorroComponent } from './reporte-ahorro/reporte-ahorro.component';
import { TramitesAhorroComponent } from './tramites-ahorro/tramites-ahorro.component';
import { PagosPrestamosComponent } from './pagos-prestamos/pagos-prestamos.component';
import { TramitesPrestamoComponent } from './tramites-prestamo/tramites-prestamo.component';
import { AprobacionAvalComponent } from './aprobacion-aval/aprobacion-aval.component';

const routes: Routes = [
  {
    path: 'reportes',
    component: ReporteAhorroComponent,
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
