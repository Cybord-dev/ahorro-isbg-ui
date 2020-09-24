import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile/profile.component';

// Tabs Component
import { TabsModule } from 'ngx-bootstrap/tabs';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ReporteSolicitudesComponent } from './reporte-solicitudes/reporte-solicitudes.component';
import { HistoricoSolicitudesComponent } from './historico-solicitudes/historico-solicitudes.component';
import { ValidacionSolicitudComponent } from './validacion-solicitud/validacion-solicitud.component';



@NgModule({
  declarations: [ProfileComponent, ReporteSolicitudesComponent, HistoricoSolicitudesComponent, ValidacionSolicitudComponent],
  imports: [
    CommonModule,
    TabsModule,
    BsDatepickerModule.forRoot(),
  ],
  exports: [
    ProfileComponent,
    CommonModule,
    TabsModule,
    BsDatepickerModule
  ]
})
export class CommonsPagesModule { }
