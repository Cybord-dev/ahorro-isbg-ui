import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReporteAhorroComponent } from './reporte-ahorro/reporte-ahorro.component';
import { TramitesAhorroComponent } from './tramites-ahorro/tramites-ahorro.component';
import { PagosPrestamosComponent } from './pagos-prestamos/pagos-prestamos.component';

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
    path: 'pagos',
    component: PagosPrestamosComponent,
    data: {
      title: 'Pagos anticipados'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuariosRoutingModule { }
