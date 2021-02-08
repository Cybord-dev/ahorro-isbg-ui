import { NgModule } from '@angular/core';

import { AdministracionRoutingModule } from './administracion-routing.module';
import { CommonsPagesModule } from '../commons/common-pages.module';
import { ConfiguracionesComponent } from './configuraciones/configuraciones.component';


@NgModule({
  declarations: [ConfiguracionesComponent],
  imports: [
    CommonsPagesModule,
    AdministracionRoutingModule
  ]
})
export class AdministracionModule { }
