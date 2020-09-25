import { NgModule } from '@angular/core';

import { RecursosHumanosRoutingModule } from './recursos-humanos-routing.module';
import { ConciliacionRhComponent } from './conciliacion-rh/conciliacion-rh.component';
import { CommonsPagesModule } from '../commons/common-pages.module';


@NgModule({
  declarations: [ConciliacionRhComponent],
  imports: [
    CommonsPagesModule,
    RecursosHumanosRoutingModule
  ]
})
export class RecursosHumanosModule { }
