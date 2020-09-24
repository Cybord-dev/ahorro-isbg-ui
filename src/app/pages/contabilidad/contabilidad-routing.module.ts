import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReporteSolicitudesComponent } from '../commons/reporte-solicitudes/reporte-solicitudes.component';
import { HistoricoSolicitudesComponent } from '../commons/historico-solicitudes/historico-solicitudes.component';
import { ConciliacionContaComponent } from './conciliacion-conta/conciliacion-conta.component';
import { AhorroExternosComponent } from './ahorro-externos/ahorro-externos.component';

const routes: Routes = [
  {
    path: 'validaciones',
    component: ReporteSolicitudesComponent,
    data: {
      title: 'Reporte Validaciones'
    }
  },
  {
    path: 'historico',
    component: HistoricoSolicitudesComponent,
    data: {
      title: 'Historico validaciones'
    }
  },
  {
    path: 'conciliacion',
    component: ConciliacionContaComponent,
    data: {
      title: 'Conciliaciones Contabilidad'
    }
  },
  {
    path: 'carga-ahorro',
    component: AhorroExternosComponent,
    data: {
      title: 'Ahorro usuarios externos'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContabilidadRoutingModule { }
