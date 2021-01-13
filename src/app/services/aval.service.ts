import { Injectable } from '@angular/core';
import { Aval } from '../models/aval';

@Injectable({
  providedIn: 'root'
})
export class AvalService {

  constructor() { }


  private SAMPLE_DATA: any[] = [{noEmpleadoAval:'123'},{noEmpleadoAval:'124'}];

  //mock service
  public testAvalService(): Promise<any> {
    return new Promise(resolve => {
        // delay (0 segundo)
        resolve(this.SAMPLE_DATA);
      });
  }
}
