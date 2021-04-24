import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReporteSolicitudesComponent } from '../commons/reporte-solicitudes/reporte-solicitudes.component';
import { HistoricoSolicitudesComponent } from '../commons/historico-solicitudes/historico-solicitudes.component';
import { ValidacionSolicitudComponent } from '../commons/validacion-solicitud/validacion-solicitud.component';
import { ReporteAhorrosComponent } from '../commons/reporte-ahorros/reporte-ahorros.component';
import { ReportePrestamosComponent } from '../commons/reporte-prestamos/reporte-prestamos.component';
import { ConciliacionPrestamosComponent } from '../commons/conciliacion-prestamos/conciliacion-prestamos.component';

const routes: Routes = [
  {
    path: 'validaciones',
    component: ReporteSolicitudesComponent,
    data: {
      title: 'Reporte Validaciones'
    }
  },
  {
    path: 'validacion/:idSolicitud',
    component: ValidacionSolicitudComponent,
    data: {
      title: 'Usario ISBG'
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
    path: 'historico/:idSolicitud',
    component: ValidacionSolicitudComponent,
    data: {
      title: 'Usario ISBG'
    }
  },
  {
    path: 'reportes-ahorro',
    component: ReporteAhorrosComponent,
    data: {
      title: 'Reporte de ahorro caja',
    }
  },
  {
    path: 'reportes-prestamo',
    component: ReportePrestamosComponent,
    data: {
      title: 'Reporte de prestamos caja',
    }
  },
  {
    path: 'pagos-prestamos',
    component: ConciliacionPrestamosComponent,
    data: {
      title: 'Conciliacion pago prestamos'
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TesoreriaRoutingModule { }
