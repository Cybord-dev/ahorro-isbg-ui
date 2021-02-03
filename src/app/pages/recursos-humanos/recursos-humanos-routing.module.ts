import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReporteSolicitudesComponent } from '../commons/reporte-solicitudes/reporte-solicitudes.component';
import { UsuariosComponent } from '../commons/usuarios/usuarios.component';
import { UsuarioComponent } from '../commons/usuario/usuario.component';
import { HistoricoSolicitudesComponent } from '../commons/historico-solicitudes/historico-solicitudes.component';
import { ConciliacionRhComponent } from './conciliacion-rh/conciliacion-rh.component';
import { ValidacionSolicitudComponent } from '../commons/validacion-solicitud/validacion-solicitud.component';
import { SaldosUsuarioComponent } from '../commons/saldos-usuario/saldos-usuario.component';
import { ValidacionPagoComponent } from '../commons/validacion-pago/validacion-pago.component';
import { ReporteAhorrosComponent } from '../commons/reporte-ahorros/reporte-ahorros.component';
import { ReportePrestamosComponent } from '../commons/reporte-prestamos/reporte-prestamos.component';

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
    path: 'pagos-capital',
    component: ValidacionPagoComponent,
    data: {
      title: 'ValidacionPagos'
    }
  },
  {
    path: 'saldo-usuarios/:idUsuario',
    component: SaldosUsuarioComponent,
    data: {
      title: 'Saldos usuario'
    }
  },
  {
    path: 'conciliacion',
    component: ConciliacionRhComponent,
    data: {
      title: 'Conciliacion RH'
    }
  },
  {
    path: 'usuarios',
    component: UsuariosComponent,
    data: {
      title: 'Usuarios'
    }
  },
  {
    path: 'usuarios/:idUsuario',
    component: UsuarioComponent,
    data: {
      title: 'Usario ISBG'
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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecursosHumanosRoutingModule { }
