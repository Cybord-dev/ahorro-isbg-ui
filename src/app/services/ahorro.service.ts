import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SaldoAhorro } from '../models/saldoahorro';

@Injectable({
  providedIn: 'root'
})
export class AhorroServicio {
  
  constructor(private http: HttpClient) { }

  public getSaldoByUsuario (idUsuario: number): Observable<SaldoAhorro[]>{
    return this.http.get<SaldoAhorro[]>('../usuarios/${idUsuario}/ahorros');
  }

  public postSaldo (idUsuario: number, saldo: SaldoAhorro): Observable<SaldoAhorro[]>{
    return this.http.post<SaldoAhorro[]>('../usuarios/${idUsuario}/ahorro', saldo);
  }

  public getSaldoByUsuarioAndId (idUsuario: number, idSaldo: number): Observable<SaldoAhorro[]>{
    return this.http.get<SaldoAhorro[]>('../usuarios/${idUsuario}/ahorros/${idAhorro}');
  }

}

