import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SolicitudAhorroComponent } from './solicitud-ahorro/solicitud-ahorro.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { ProfileComponent } from './profile/profile.component';



@NgModule({
  declarations: [SolicitudAhorroComponent, UsuariosComponent, UsuarioComponent, ProfileComponent],
  imports: [
    CommonModule
  ],
  exports: [SolicitudAhorroComponent, UsuariosComponent, UsuarioComponent, ProfileComponent]
})
export class CommonsModule { }
