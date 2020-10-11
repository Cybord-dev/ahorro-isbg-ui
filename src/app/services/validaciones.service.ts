import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Validacion } from '../models/validacion';

@Injectable({
  providedIn: 'root'
})
export class ValidacionesService {

    constructor(private http: HttpClient) { }

    public getValidaciones (): Observable<Validacion[]>{
      return this.http.get<Validacion[]>('../api/v1/validaciones');
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
