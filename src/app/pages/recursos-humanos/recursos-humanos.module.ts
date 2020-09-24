import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecursosHumanosRoutingModule } from './recursos-humanos-routing.module';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UsuarioComponent } from './usuario/usuario.component';


@NgModule({
  declarations: [UsuariosComponent, UsuarioComponent],
  imports: [
    CommonModule,
    RecursosHumanosRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class RecursosHumanosModule { }
