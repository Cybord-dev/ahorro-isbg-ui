import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ValidacionesReportComponent } from '../commons/validaciones-report/validaciones-report.component';
import { UsuariosComponent } from './usuarios/usuarios.component';

const routes: Routes = [
  {
    path: 'validaciones',
    component: ValidacionesReportComponent,
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
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecursosHumanosRoutingModule { }
