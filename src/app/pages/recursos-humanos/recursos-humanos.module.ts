import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecursosHumanosRoutingModule } from './recursos-humanos-routing.module';
import { UsuariosComponent } from './usuarios/usuarios.component';


@NgModule({
  declarations: [UsuariosComponent],
  imports: [
    CommonModule,
    RecursosHumanosRoutingModule
  ]
})
export class RecursosHumanosModule { }
