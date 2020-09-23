import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { ReporteSolicitudesComponent } from '../commons/reporte-solicitudes/reporte-solicitudes.component';

const routes: Routes = [
  {
    path: 'validaciones',
    component: ReporteSolicitudesComponent,
    data: {
      title: 'Reporte Validaciones'
    }
  },
  {
    path: 'usuarios',
    component: UsuariosComponent,
    data: {
      title: 'Alta y baja '
    }
  },
  {
    path: 'historico',
    component: ReporteSolicitudesComponent,
    data: {
      title: 'Historico validaciones'
    }
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecursosHumanosRoutingModule { }
