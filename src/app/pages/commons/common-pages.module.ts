import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile/profile.component';
import { ValidacionesReportComponent } from './validaciones-report/validaciones-report.component';

// Tabs Component
import { TabsModule } from 'ngx-bootstrap/tabs';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';



@NgModule({
  declarations: [ProfileComponent, ValidacionesReportComponent],
  imports: [
    CommonModule,
    TabsModule,
    BsDatepickerModule.forRoot(),
  ],
  exports: [
    ProfileComponent,
    ValidacionesReportComponent,
    CommonModule,
    TabsModule,
    BsDatepickerModule
  ]
})
export class CommonsPagesModule { }
