import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { ProfileComponent } from './profile/profile.component';
import { ValidacionesReportComponent } from './validaciones-report/validaciones-report.component';

// Tabs Component
import { TabsModule } from 'ngx-bootstrap/tabs';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';



@NgModule({
  declarations: [UsuariosComponent, UsuarioComponent, ProfileComponent, ValidacionesReportComponent],
  imports: [
    CommonModule,
    TabsModule,
    BsDatepickerModule.forRoot(),
  ],
  exports: [
    UsuariosComponent,
    UsuarioComponent,
    ProfileComponent,
    ValidacionesReportComponent,
    CommonModule,
    TabsModule,
    BsDatepickerModule
  ]
})
export class CommonsPagesModule { }
