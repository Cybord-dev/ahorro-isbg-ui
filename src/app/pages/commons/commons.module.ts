import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SolicitudAhorroComponent } from './solicitud-ahorro/solicitud-ahorro.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { UsuarioComponent } from './usuario/usuario.component';



@NgModule({
  declarations: [SolicitudAhorroComponent, UsuariosComponent, UsuarioComponent],
  imports: [
    CommonModule
  ]
})
export class CommonsModule { }
