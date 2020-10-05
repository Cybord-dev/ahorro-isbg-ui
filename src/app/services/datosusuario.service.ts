import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { DatosUsuario } from '../models/datosusuario';

@Injectable({
    providedIn: 'root'
  })
  export class DatosUsuarioService {
  
    constructor(private http: HttpClient) { }
  
    public postDatosUsuarios (datos: DatosUsuario): Observable<DatosUsuario[]>{
      return this.http.post<DatosUsuario[]>(`../api/v1/datos`, datos);
    }
  
    public putSaldo (idSaldo: number, saldo: DatosUsuario): Observable<DatosUsuario[]>{
      return this.http.put<DatosUsuario[]>(`../api/v1/datos/${idSaldo}`, saldo);
    }
  
    public deleteSaldo (idSaldo: number): Observable<any>{
      return this.http.delete<DatosUsuario[]>(`../api/v1/datos/${idSaldo}`);
    }
  
  }