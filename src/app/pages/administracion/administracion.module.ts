import { NgModule } from '@angular/core';

import { AdministracionRoutingModule } from './administracion-routing.module';
import { CommonsPagesModule } from '../commons/common-pages.module';
//import { AltaRolesComponent } from './alta-roles/alta-roles.component';


@NgModule({
  declarations: [],//AltaRolesComponent],
  imports: [
    CommonsPagesModule,
    AdministracionRoutingModule
  ]
})
export class AdministracionModule { }
