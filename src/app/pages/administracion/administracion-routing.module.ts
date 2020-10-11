import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReporteSolicitudesComponent } from '../commons/reporte-solicitudes/reporte-solicitudes.component';
import { HistoricoSolicitudesComponent } from '../commons/historico-solicitudes/historico-solicitudes.component';
import { UsuariosComponent } from '../commons/usuarios/usuarios.component';
import { AltaRolesComponent } from './alta-roles/alta-roles.component';
import { ValidacionSolicitudComponent } from '../commons/validacion-solicitud/validacion-solicitud.component';

const routes: Routes = [
  {
    path: 'usuarios',
    component: UsuariosComponent,
    data: {
      title: 'Usuarios'
    }
  },
  {
    path: 'roles/:idUsuario',
    component: AltaRolesComponent,
    data: {
      title: 'Usario ISBG'
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
    path: 'historico',
    component: HistoricoSolicitudesComponent,
    data: {
      title: 'Historico validaciones'
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministracionRoutingModule { }
