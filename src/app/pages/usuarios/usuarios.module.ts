import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuariosRoutingModule } from './usuarios-routing.module';
import { ReporteAhorroComponent } from './reporte-ahorro/reporte-ahorro.component';


// Tabs Component
import { TabsModule } from 'ngx-bootstrap/tabs';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TramitesAhorroComponent } from './tramites-ahorro/tramites-ahorro.component';

@NgModule({
  declarations: [ReporteAhorroComponent, TramitesAhorroComponent],
  imports: [
    CommonModule,
    TabsModule,
    BsDatepickerModule.forRoot(),
    UsuariosRoutingModule
  ]
})
export class UsuariosModule { }
