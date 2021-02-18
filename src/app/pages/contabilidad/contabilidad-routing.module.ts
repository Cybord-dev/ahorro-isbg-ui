import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReporteSolicitudesComponent } from '../commons/reporte-solicitudes/reporte-solicitudes.component';
import { HistoricoSolicitudesComponent } from '../commons/historico-solicitudes/historico-solicitudes.component';
import { ConciliacionContaComponent } from './conciliacion-conta/conciliacion-conta.component';
import { AhorroExternosComponent } from './ahorro-externos/ahorro-externos.component';
import { UsuariosComponent } from '../commons/usuarios/usuarios.component';
import { UsuarioComponent } from '../commons/usuario/usuario.component';
import { ValidacionSolicitudComponent } from '../commons/validacion-solicitud/validacion-solicitud.component';
import { ReporteAhorrosComponent } from '../commons/reporte-ahorros/reporte-ahorros.component';
import { AjustesComponent } from '../commons/ajustes/ajustes.component';
import { AhorroUsuarioComponent } from '../commons/ahorro-usuario/ahorro-usuario.component';
import { ValidacionPagoComponent } from '../commons/validacion-pago/validacion-pago.component';
import { ReportePrestamosComponent } from '../commons/reporte-prestamos/reporte-prestamos.component';
import { PrestamoUsuarioComponent } from '../commons/prestamo-usuario/prestamo-usuario.component';

const routes: Routes = [
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
    path: 'saldo-ahorro/:idUsuario',
    component: AhorroUsuarioComponent,
    data: {
      title: 'Ahorro usuario'
    }
  },
  {
    path: 'prestamos-activos/:idUsuario',
    component: PrestamoUsuarioComponent,
    data: {
      title: 'Prestamos usuario'
    }
  },
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
    path: 'historico/:idSolicitud',
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
    path: 'ajustes/:idUsuario',
    component: AjustesComponent,
    data: {
      title: 'Ajustes de ahorro'
    }
  },
  {
    path: 'pagos-capital',
    component: ValidacionPagoComponent,
    data: {
      title: 'ValidacionPagos'
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContabilidadRoutingModule { }
