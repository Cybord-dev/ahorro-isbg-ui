import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuariosService } from './services/usuarios.service';
import { UsuariosData } from './data/usuarios-data';

const DATA_SERVICES = [
  {provide: UsuariosData, useClass: UsuariosService }
];

export const NB_CORE_PROVIDERS = [
  ...DATA_SERVICES,
];

@NgModule({
  imports: [
    CommonModule,
  ],
 
  declarations: [],
})
export class CoreModule {
  static forRoot(): any[] | import("@angular/core").Type<any> | ModuleWithProviders<{}> {
    return {
      ngModule: CoreModule,
      providers: [ ...NB_CORE_PROVIDERS ]
    }
  }

  constructor() {
    
  }

}
