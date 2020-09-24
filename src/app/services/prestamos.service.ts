import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SaldoPrestamo } from '../models/saldoprestamo';

@Injectable({
  providedIn: 'root'
})
export class PrestamosService {

  constructor(private http: HttpClient) { }

  public getPrestamosByUsuario (idUsuario: number): Observable<SaldoPrestamo[]>{
    return this.http.get<SaldoPrestamo[]>('../usuarios/${idUsuario}/prestamos');
  }

  public getPrestamosByUsuairoAndPrestamoAndSaldo (idUsuario: number, idPrestamo: number, idSaldo: number): Observable<SaldoPrestamo[]>{
    return this.http.get<SaldoPrestamo[]>('../usuarios/${idUsuario}/prestamos/${idPrestamo}/saldos/${idSaldo}');
  }

  public postPrestamosByUsuario (idUsuario: number, prestamo: SaldoPrestamo): Observable<SaldoPrestamo[]>{
    return this.http.post<SaldoPrestamo[]>('../usuarios/${idUsuario}/prestamos', prestamo);
  }

}
