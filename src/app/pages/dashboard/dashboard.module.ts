import { NgModule } from '@angular/core';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { CommonsPagesModule } from '../commons/common-pages.module';


@NgModule({
  declarations: [],
  imports: [
    CommonsPagesModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
