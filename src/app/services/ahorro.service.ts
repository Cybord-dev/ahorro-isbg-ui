import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ReporteSaldos } from '../models/reportesaldos';
import { SaldoAhorro } from '../models/saldoahorro';
import { GenericPage } from '../models/generic-page';

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

  public getSaldoByUsuario(idUsuario: number): Observable<SaldoAhorro[]>{
    return this.http.get<SaldoAhorro[]>(`../api/v1/usuarios/${idUsuario}/ahorros`);
  }

  public postSaldo(idUsuario: number, saldo: SaldoAhorro): Observable<SaldoAhorro[]>{
    return this.http.post<SaldoAhorro[]>(`../api/v1/usuarios/${idUsuario}/ahorros`, saldo);
  }

  public getSaldoByUsuarioAndId(idUsuario: number, idAhorro: number): Observable<SaldoAhorro[]>{
    return this.http.get<SaldoAhorro[]>(`../api/v1/usuarios/${idUsuario}/ahorros/${idAhorro}`);
  }

  public getReporteSaldos(filterParams?: any): Observable<GenericPage<ReporteSaldos>>{
    return this.http.get<GenericPage<ReporteSaldos>>(`../api/v1/saldosAhorro`, {params: this.getHttpParams(filterParams)});
  }

  public postSaldoBulk(saldoBulk: SaldoAhorro[]): Observable<SaldoAhorro[]>{
    return this.http.post<SaldoAhorro[]>(`../api/v1/ahorros/bulk`, saldoBulk);
  }


}

