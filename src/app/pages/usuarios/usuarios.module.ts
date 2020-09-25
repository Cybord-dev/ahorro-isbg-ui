import { NgModule } from '@angular/core';
import { UsuariosRoutingModule } from './usuarios-routing.module';
import { ReporteAhorroComponent } from './reporte-ahorro/reporte-ahorro.component';

import { TramitesAhorroComponent } from './tramites-ahorro/tramites-ahorro.component';
import { CommonsPagesModule } from '../commons/common-pages.module';

import { ChartsModule } from 'ng2-charts';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [ReporteAhorroComponent, TramitesAhorroComponent],
  imports: [
    CommonsPagesModule,
    UsuariosRoutingModule,
    ChartsModule,
    FormsModule
  ]
})
export class UsuariosModule { }
