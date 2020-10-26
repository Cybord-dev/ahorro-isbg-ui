import { NgModule } from '@angular/core';

import { ContabilidadRoutingModule } from './contabilidad-routing.module';
import { AhorroExternosComponent } from './ahorro-externos/ahorro-externos.component';
import { ConciliacionContaComponent } from './conciliacion-conta/conciliacion-conta.component';
import { CommonsPagesModule } from '../commons/common-pages.module';


@NgModule({
  declarations: [AhorroExternosComponent, ConciliacionContaComponent],
  imports: [
    CommonsPagesModule,
    ContabilidadRoutingModule
  ]
})
export class ContabilidadModule { }
