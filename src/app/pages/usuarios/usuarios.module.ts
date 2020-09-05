import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuariosRoutingModule } from './usuarios-routing.module';
import { ReporteAhorroComponent } from './reporte-ahorro/reporte-ahorro.component';


@NgModule({
  declarations: [ReporteAhorroComponent],
  imports: [
    CommonModule,
    UsuariosRoutingModule
  ]
})
export class UsuariosModule { }
