import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ValidacionesReportComponent } from '../commons/validaciones-report/validaciones-report.component';

const routes: Routes = [
  {
    path: 'validaciones',
    component: ValidacionesReportComponent,
    data: {
      title: 'Reporte Validaciones'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecursosHumanosRoutingModule { }
