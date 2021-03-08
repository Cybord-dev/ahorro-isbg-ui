import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Prestamo } from '../models/prestamo';
import { SaldoPrestamo } from '../models/saldoprestamo';
import { ReportePrestamo } from '../models/reporte-prestamo';
import { GenericPage } from '../models/generic-page';
import { Recurso } from '../models/recurso';

@Injectable({
  providedIn: 'root'
})
export class PrestamosService {

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

  public getPrestamosByUsuario (idUsuario: number): Observable<Prestamo[]>{
    return this.http.get<Prestamo[]>(`../api/v1/usuarios/${idUsuario}/prestamos`);
  }

  public getPrestamos(filterParams?: any): Observable<GenericPage<ReportePrestamo>>{
    return this.http.get<GenericPage<ReportePrestamo>>(`../api/v1/prestamos`, {params: this.getHttpParams(filterParams)});
  }

  public getReportePrestamos(filterParams?: any): Observable<Recurso>{
    return this.http.get<Recurso>(`../api/v1/prestamos/report`, {params: this.getHttpParams(filterParams)});
  }

  public getPrestamosByUsuairoAndPrestamoAndSaldo (idUsuario: number, idPrestamo: number, idSaldo: number): Observable<SaldoPrestamo[]>{
    return this.http.get<SaldoPrestamo[]>(`../api/v1/usuarios/${idUsuario}/prestamos/${idPrestamo}/saldos/${idSaldo}`);
  }
  
  public insertSaldoPrestamo (idPrestamo: number, prestamo: SaldoPrestamo): Observable<SaldoPrestamo>{
    return this.http.post<SaldoPrestamo>(`../api/v1/prestamos/${idPrestamo}/saldos`, prestamo);
  }
  
  public getPrestamosPendientesByUsuario (idUsuario: number): Observable<Prestamo[]>{
    return this.http.get<Prestamo[]>(`../api/v1/usuarios/${idUsuario}/prestamos/pendientes`);
  }

  public updateSaldoPrestamo(idSaldo: number, prestamo: SaldoPrestamo): Observable<SaldoPrestamo>{
    return this.http.put<SaldoPrestamo>(`../api/v1/saldo-prestamos/${idSaldo}`, prestamo);
  }

}
