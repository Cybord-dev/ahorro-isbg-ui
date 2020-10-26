import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SaldoAhorro } from '../models/saldoahorro';

@Injectable({
  providedIn: 'root'
})
export class AhorroServicio {

  constructor(private http: HttpClient) { }

  public getSaldoByUsuario(idUsuario: number): Observable<SaldoAhorro[]>{
    return this.http.get<SaldoAhorro[]>(`../api/v1/usuarios/${idUsuario}/ahorros`);
  }

  public postSaldo(idUsuario: number, saldo: SaldoAhorro): Observable<SaldoAhorro[]>{
    return this.http.post<SaldoAhorro[]>(`../api/v1/usuarios/${idUsuario}/ahorro`, saldo);
  }

  public getSaldoByUsuarioAndId(idUsuario: number, idAhorro: number): Observable<SaldoAhorro[]>{
    return this.http.get<SaldoAhorro[]>(`../api/v1/usuarios/${idUsuario}/ahorros/${idAhorro}`);
  }

  public postSaldoBulk(saldoBulk: SaldoAhorro[]): Observable<SaldoAhorro[]>{
    return this.http.post<SaldoAhorro[]>(`../api/v1/ahorros/bulk`, saldoBulk);
  }


}

