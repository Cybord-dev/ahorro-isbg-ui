import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReporteSolicitudesComponent } from '../commons/reporte-solicitudes/reporte-solicitudes.component';
import { HistoricoSolicitudesComponent } from '../commons/historico-solicitudes/historico-solicitudes.component';
import { UsuariosComponent } from '../commons/usuarios/usuarios.component';
import { ValidacionSolicitudComponent } from '../commons/validacion-solicitud/validacion-solicitud.component';
import { UsuarioComponent } from '../commons/usuario/usuario.component';
import { ConfiguracionesComponent } from './configuraciones/configuraciones.component';

const routes: Routes = [
  {
    path: 'configuraciones',
    component: ConfiguracionesComponent,
    data: {
      title: 'Configuraciones'
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
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministracionRoutingModule { }
