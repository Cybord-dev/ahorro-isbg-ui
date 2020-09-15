import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReporteAhorroComponent } from './reporte-ahorro/reporte-ahorro.component';
import { TramitesAhorroComponent } from './tramites-ahorro/tramites-ahorro.component';

const routes: Routes = [
  {
    path: 'reportes',
    component: ReporteAhorroComponent,
    data: {
      title: 'Historico ahorro'
    }
  },
  {
    path: 'tramites',
    component: TramitesAhorroComponent,
    data: {
      title: 'Trámites ahorro'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuariosRoutingModule { }
