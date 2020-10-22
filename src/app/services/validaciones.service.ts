import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Validacion } from '../models/validacion';
import { GenericPage } from '../models/generic-page';
import { HistoricoValidacion } from '../models/historico-validacion';

@Injectable({
  providedIn: 'root'
})
export class ValidacionesService {

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

    public getValidaciones(filterParams: any): Observable<GenericPage<HistoricoValidacion>> {
      return this.http.get<GenericPage<HistoricoValidacion>>('../api/v1/validaciones', {params: this.getHttpParams(filterParams)});
    }

    public getValidacionesBySolicitud (idUsuario: number, idSolicitud: number): Observable<Validacion[]>{
      return this.http.get<Validacion[]>(`../api/v1/usuarios/${idUsuario}/solicitudes/${idSolicitud}/validaciones`);
    }

    public getValidacionById (idUsuario: number, idSolicitud: number, idValidacion: number): Observable<Validacion[]>{
        return this.http.get<Validacion[]>(`../api/v1/usuarios/${idUsuario}/solicitudes/${idSolicitud}/validaciones/${idValidacion}`);
    }

    public postValidacion(idUsuario: number, idSolicitud: number, validacion: Validacion): Observable<Validacion>{
      return this.http.post<Validacion>(`../api/v1/usuarios/${idUsuario}/solicitudes/${idSolicitud}/validaciones`, validacion);
    }

    public putValidacion(idValidacion: number, validacion: Validacion): Observable<Validacion>{
      return this.http.put<Validacion>(`../api/v1/validaciones/${idValidacion}`, validacion);
    }

    public deleteValidacion(idValidacion: number): Observable<any>{
        return this.http.delete<Validacion[]>(`../api/v1/validaciones/${idValidacion}`);
    }
}
