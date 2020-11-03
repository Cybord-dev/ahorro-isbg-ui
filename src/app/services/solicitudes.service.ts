import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Solicitud } from '../models/solicitud';
import { GenericPage } from '../models/generic-page';
import { Recurso } from '../models/recurso';

@Injectable({
  providedIn: 'root'
})
export class SolicitudesService {

  constructor(private http: HttpClient) { }

  private getHttpParams(filterParams: any): HttpParams {
    let pageParams: HttpParams =  new HttpParams();
    for (const key in filterParams) {
      if (filterParams[key] !== undefined) {
      const value: string = filterParams[key].toString();
      if ( value !== null && value.length > 0 && value !== '*') {
          pageParams = pageParams.append(key, value);
        }
      }
    }
    return pageParams;
  }

  public getSolicitudes(filterParams?: any): Observable<GenericPage<Solicitud>> {
    return this.http.get<GenericPage<Solicitud>>('../api/v1/solicitudes', {params: this.getHttpParams(filterParams)});
  }

  public getReporteSolicitudes(filterParams?: any): Observable<Recurso> {
    return this.http.get<Recurso>('../api/v1/solicitudes/report', {params: this.getHttpParams(filterParams)});
  }

  public getSolicitudesById(idSolicitud: number): Observable<Solicitud>{
    return this.http.get<Solicitud>(`../api/v1/solicitudes/${idSolicitud}`);
  }

  public getSolicitudesByUsuarioAndId(idUsuario: number, idSolicitud: number): Observable<Solicitud>{
    return this.http.get<Solicitud>(`../api/v1/usuarios/${idUsuario}/solicitudes/${idSolicitud}`);
  }

  public getSolicitudesByUsuario(idUsuario: number): Observable<Solicitud[]>{
    return this.http.get<Solicitud[]>(`../api/v1/usuarios/${idUsuario}/solicitudes`);
  }

  public postSolictudUsuario(idUsuario: number, solicitud: Solicitud): Observable<Solicitud[]>{
    return this.http.post<Solicitud[]>(`../api/v1/usuarios/${idUsuario}/solicitudes`, solicitud);
  }

  public putSolictud(idSolicitud: number, solicitud: Solicitud): Observable<Solicitud[]>{
    return this.http.post<Solicitud[]>(`../api/v1/solicitudes/${idSolicitud}`, solicitud);
  }

  public deleteSolictud(idSolicitud: number): Observable<any>{
    return this.http.delete<Solicitud[]>(`../api/v1/solicitudes/${idSolicitud}`);
  }
}
