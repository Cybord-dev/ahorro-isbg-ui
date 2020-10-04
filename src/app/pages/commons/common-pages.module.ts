import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// UI Component
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
    FormsModule,
    ReactiveFormsModule,
    BsDatepickerModule.forRoot(),
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BsDatepickerModule,
    ProfileComponent,
    ReporteSolicitudesComponent,
    HistoricoSolicitudesComponent,
    ValidacionSolicitudComponent,
  ]
})
export class CommonsPagesModule { }
