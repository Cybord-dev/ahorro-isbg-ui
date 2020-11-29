import { NgModule } from '@angular/core';
import { DatePipe } from '@angular/common';
import { UsuariosRoutingModule } from './usuarios-routing.module';
import { ReporteAhorroComponent } from './reporte-ahorro/reporte-ahorro.component';

import { TramitesAhorroComponent } from './tramites-ahorro/tramites-ahorro.component';
import { CommonsPagesModule } from '../commons/common-pages.module';

import { ChartsModule } from 'ng2-charts';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { PagosPrestamosComponent } from './pagos-prestamos/pagos-prestamos.component';
import { TramitesPrestamoComponent } from './tramites-prestamo/tramites-prestamo.component';
import { AprobacionAvalComponent } from './aprobacion-aval/aprobacion-aval.component';


@NgModule({
  declarations: [ReporteAhorroComponent, TramitesAhorroComponent, PagosPrestamosComponent, TramitesPrestamoComponent, AprobacionAvalComponent],
  imports: [
    CommonsPagesModule,
    UsuariosRoutingModule,
    ChartsModule,
    TabsModule.forRoot()
  ],
  providers: [
    DatePipe
  ]
})
export class UsuariosModule { }
