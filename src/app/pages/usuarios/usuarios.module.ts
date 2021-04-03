import { NgModule } from '@angular/core';
import { DatePipe } from '@angular/common';
import { UsuariosRoutingModule } from './usuarios-routing.module';

import { TramitesAhorroComponent } from './tramites-ahorro/tramites-ahorro.component';
import { CommonsPagesModule } from '../commons/common-pages.module';

import { TramitesPrestamoComponent } from './tramites-prestamo/tramites-prestamo.component';
import { AprobacionAvalComponent } from './aprobacion-aval/aprobacion-aval.component';


@NgModule({
  declarations: [TramitesAhorroComponent, TramitesPrestamoComponent, AprobacionAvalComponent],
  imports: [
    CommonsPagesModule,
    UsuariosRoutingModule,
  ],
  providers: [
    DatePipe
  ]
})
export class UsuariosModule { }
