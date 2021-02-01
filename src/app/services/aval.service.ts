import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Aval } from '../models/aval';
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
    return this.http.get<Aval[]>(`../api/v1/solicitudes/${idSolicitud}/avales`);
  }

  public getAceptacionesPendientesPorIdUsuario(idUsuario:number): Observable<Aval[]>{
    return this.http.get<Aval[]>(`../api/v1/usuarios/${idUsuario}/avales`);
  }

  public putAval(idAval: number, aval: Aval): Observable<Aval>{
    return this.http.put<Aval>(`../api/v1/avales/${idAval}`, aval);
  }
  
}
