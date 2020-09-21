import { NgModule } from '@angular/core';
import { UsuariosRoutingModule } from './usuarios-routing.module';
import { ReporteAhorroComponent } from './reporte-ahorro/reporte-ahorro.component';

import { TramitesAhorroComponent } from './tramites-ahorro/tramites-ahorro.component';
import { CommonsPagesModule } from '../commons/common-pages.module';

@NgModule({
  declarations: [ReporteAhorroComponent, TramitesAhorroComponent],
  imports: [
    CommonsPagesModule,
    UsuariosRoutingModule
  ]
})
export class UsuariosModule { }
