import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AceptacionAval } from '../models/aceptacion-aval';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AvalService {

  constructor(private http: HttpClient) { }


  private SAMPLE_DATA: any[] = [{noEmpleadoAval:'123'},{noEmpleadoAval:'124'}];

  //mock service
  public testAvalService(): Promise<any> {
    return new Promise(resolve => {
        // delay (0 segundo)
        resolve(this.SAMPLE_DATA);
      });
  }

  public getAceptacionesPorSolicitud(idSolicitud:number){
    return this.http.get<AceptacionAval[]>(`../api/v1/solicitudes/${idSolicitud}/avales`);
  }

  public getAceptacionesPendientesPorNoEmpleado(noEmpleado:string): Observable<AceptacionAval[]>{
    return this.http.get<AceptacionAval[]>(`../api/v1/usuarios/${noEmpleado}/avales`);
  }

  
}
