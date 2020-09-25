import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Solicitud } from '../models/solicitud';

@Injectable({
  providedIn: 'root'
})
export class SolicitudesService {

  constructor(private http: HttpClient) { }

  public getSolicitudes(page: number, size: number, filterParams?: any): Observable<any> {
    let pageParams: HttpParams = new HttpParams().append('page', page.toString()).append('size', size.toString());
    for (const key in filterParams) {
      if (filterParams[key] !== undefined) {
        const value: string = filterParams[key];
        if (value.length > 0 && value !== '*') {
          pageParams = pageParams.append(key, value);
        }
      }
    }
    return this.http.get('../solicitudes', { params: pageParams });
  }


  public getSolicitudesById(idUsuario: number, idSolicitud: number): Observable<Solicitud>{
    return this.http.get<Solicitud>(`../usuarios/${idUsuario}/solicitudes/${idSolicitud}`);
  }

  public getSolicitudesByUsuario(idUsuario: number): Observable<Solicitud[]>{
    return this.http.get<Solicitud[]>(`../usuarios/${idUsuario}/solicitudes`);
  }

  public postSolictudUsuario(idUsuario: number, solicitud: Solicitud): Observable<Solicitud[]>{
    return this.http.post<Solicitud[]>(`../usuarios/${idUsuario}/solicitudes`, solicitud);
  }

  public putSolictud(idSolicitud: number, solicitud: Solicitud): Observable<Solicitud[]>{
    return this.http.post<Solicitud[]>(`../solicitudes/${idSolicitud}`, solicitud);
  }

  public deleteSolictud(idSolicitud: number): Observable<any>{
    return this.http.delete<Solicitud[]>(`../solicitudes/${idSolicitud}`);
  }
}
