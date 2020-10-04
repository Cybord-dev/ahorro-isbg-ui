import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// UI Component
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ChartsModule } from 'ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';


// Common components
import { CommonsRoutingModule } from './commons-routing.module';

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
    FormsModule,
    ChartsModule,
    BsDropdownModule,
    ButtonsModule.forRoot(),
    ReactiveFormsModule,
    CommonsRoutingModule
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
