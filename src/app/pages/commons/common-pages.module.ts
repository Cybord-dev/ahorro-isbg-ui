import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// UI Component
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ChartsModule } from 'ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { AlertModule } from 'ngx-bootstrap/alert';
import { ModalModule } from 'ngx-bootstrap/modal';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';


// Common components
import { CommonsRoutingModule } from './commons-routing.module';

import { ProfileComponent } from './profile/profile.component';
import { ReporteSolicitudesComponent } from './reporte-solicitudes/reporte-solicitudes.component';
import { HistoricoSolicitudesComponent } from './historico-solicitudes/historico-solicitudes.component';
import { ValidacionSolicitudComponent } from './validacion-solicitud/validacion-solicitud.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { ReporteAhorrosComponent } from './reporte-ahorros/reporte-ahorros.component';
import { AjusteAhorroComponent } from './ajuste-ahorro/ajuste-ahorro.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoaderComponent } from './loader/loader.component';
import { ValidacionPagoComponent } from './validacion-pago/validacion-pago.component';




@NgModule({
  declarations: [
    ProfileComponent,
    DashboardComponent,
    ReporteSolicitudesComponent,
    HistoricoSolicitudesComponent,
    ValidacionSolicitudComponent,
    UsuariosComponent,
    UsuarioComponent,
    AjusteAhorroComponent,
    ReporteAhorrosComponent,
    LoaderComponent,
    ValidacionPagoComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BsDatepickerModule.forRoot(),
    AlertModule.forRoot(),
    ModalModule.forRoot(),
    FormsModule,
    ChartsModule,
    BsDropdownModule,
    ButtonsModule.forRoot(),
    ReactiveFormsModule,
    CommonsRoutingModule,
    CarouselModule.forRoot(),
    AutocompleteLibModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AlertModule,
    ModalModule,
    BsDatepickerModule,
    ProfileComponent,
    AjusteAhorroComponent,
    ReporteSolicitudesComponent,
    LoaderComponent,
    HistoricoSolicitudesComponent,
    ValidacionSolicitudComponent,
    CarouselModule,
    AutocompleteLibModule
  ],
  providers: [
    DatePipe
  ]
})
export class CommonsPagesModule { }
