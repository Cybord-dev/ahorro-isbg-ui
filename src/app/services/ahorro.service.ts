import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ReporteAhorro } from '../models/reporte-ahorro';
import { SaldoAhorro } from '../models/saldoahorro';
import { Conciliador } from 'src/app/models/conciliador';
import { SaldoAhorroCaja } from '../models/saldoahorrocaja';
import { GenericPage } from '../models/generic-page';
import { Recurso } from '../models/recurso';

@Injectable({
  providedIn: 'root'
})
export class AhorroServicio {

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

  public getAhorroUsuarios(filterParams?: any): Observable<GenericPage<ReporteAhorro>>{
    return this.http.get<GenericPage<ReporteAhorro>>(`../api/v1/ahorros`, {params: this.getHttpParams(filterParams)});
  }

  public getReporteAhorroUsuarios(filterParams?: any): Observable<Recurso>{
    return this.http.get<Recurso>(`../api/v1/ahorros/report`, {params: this.getHttpParams(filterParams)});
  }

  public getSaldoByUsuario(idUsuario: number): Observable<SaldoAhorro[]>{
    return this.http.get<SaldoAhorro[]>(`../api/v1/usuarios/${idUsuario}/ahorros`);
  }

  public postSaldo(idUsuario: number, saldo: SaldoAhorro): Observable<SaldoAhorro[]>{
    return this.http.post<SaldoAhorro[]>(`../api/v1/usuarios/${idUsuario}/ahorros`, saldo);
  }

  public getSaldoByUsuarioAndId(idUsuario: number, idAhorro: number): Observable<SaldoAhorro[]>{
    return this.http.get<SaldoAhorro[]>(`../api/v1/usuarios/${idUsuario}/ahorros/${idAhorro}`);
  }

  public postSaldoBulk(saldoBulk: SaldoAhorro[]): Observable<any>{
    return this.http.post<SaldoAhorro[]>(`../api/v1/ahorros/externos`, saldoBulk);
  }

  public postValidarInternos(datosValidar: Conciliador[]): Observable<any[]>{
    return this.http.post<Conciliador[]>(`../api/v1/ahorros/conciliacion`, datosValidar);
  }

  public postConciliarInternos(datosConciliar: Conciliador[]): Observable<any[]>{
    return this.http.post<Conciliador[]>(`../api/v1/ahorros/internos`, datosConciliar);
  }



  public getSaldoMesesCaja(): Observable<any>{
    return this.http.get(`../api/v1/saldo-ahorros/anual`);
  }

  public getSaldoCajaAgrupado(): Observable<SaldoAhorroCaja[]>{
    return this.http.get<SaldoAhorroCaja[]>(`../api/v1/saldo-ahorros/anual/agrupado`);
  }

}

