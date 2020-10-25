import { NgModule } from '@angular/core';

import { ContabilidadRoutingModule } from './contabilidad-routing.module';
import { AhorroExternosComponent } from './ahorro-externos/ahorro-externos.component';
import { ConciliacionContaComponent } from './conciliacion-conta/conciliacion-conta.component';
import { CommonsPagesModule } from '../commons/common-pages.module';
import { AjusteAhorroComponent } from './ajuste-ahorro/ajuste-ahorro.component';


@NgModule({
  declarations: [AhorroExternosComponent, ConciliacionContaComponent, AjusteAhorroComponent],
  imports: [
    CommonsPagesModule,
    ContabilidadRoutingModule
  ]
})
export class ContabilidadModule { }
