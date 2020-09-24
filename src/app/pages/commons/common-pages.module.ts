import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// UI Component
import { TabsModule } from 'ngx-bootstrap/tabs';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

// Common components
import { ProfileComponent } from './profile/profile.component';
import { ReporteSolicitudesComponent } from './reporte-solicitudes/reporte-solicitudes.component';
import { HistoricoSolicitudesComponent } from './historico-solicitudes/historico-solicitudes.component';
import { ValidacionSolicitudComponent } from './validacion-solicitud/validacion-solicitud.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { UsuarioComponent } from './usuario/usuario.component';



@NgModule({
  declarations: [
    ProfileComponent,
    ReporteSolicitudesComponent,
    HistoricoSolicitudesComponent,
    ValidacionSolicitudComponent,
    UsuariosComponent,
    UsuarioComponent],
  imports: [
    CommonModule,
    TabsModule,
    BsDatepickerModule.forRoot(),
  ],
  exports: [
    CommonModule,
    TabsModule,
    BsDatepickerModule,
    ProfileComponent,
    ReporteSolicitudesComponent,
    HistoricoSolicitudesComponent,
    ValidacionSolicitudComponent,
  ]
})
export class CommonsPagesModule { }
