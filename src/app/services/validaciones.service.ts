import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Validacion } from '../models/validacion';

export class ValidacionesService {

    constructor(private http: HttpClient) { }
  
    public getValidaciones (): Observable<Validacion[]>{
      return this.http.get<Validacion[]>('../validaciones');
    }

    public getValidacionesBySolicitud (idUsuario: number, idSolicitud: number): Observable<Validacion[]>{
      return this.http.get<Validacion[]>('../usuarios/${idUsuario}/solicitudes/${idSolicitud}/validaciones');
    }

    public getValidacionById (idUsuario: number, idSolicitud: number, idValidacion: number): Observable<Validacion[]>{
        return this.http.get<Validacion[]>('../usuarios/${idUsuario}/solicitudes/${idSolicitud}/validaciones/${idValidacion}');
    }
  
    public postValidacion (idUsuario: number, idSolicitud: number, validacion: Validacion): Observable<Validacion[]>{
      return this.http.post<Validacion[]>('../usuarios/${idUsuario}/solicitudes/${idSolicitud}/validaciones', validacion);
    }
  
    public putValidacion (idValidacion: number, validacion: Validacion): Observable<Validacion[]>{
      return this.http.put<Validacion[]>('../validaciones/${idValidacion}', validacion);
    }

    public deleteValidacion (idValidacion: number): Observable<any>{
        return this.http.delete<Validacion[]>('../validaciones/${idValidacion}');
      }
  
  }