import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Atributo } from '../models/atributo';

@Injectable({
  providedIn: 'root'
})

export class AtributoService {
    constructor(private http: HttpClient) { }
    public getAtributos(): Observable<Atributo[]>{
        return this.http.get<Atributo[]>('../api/v1/atributos');
    }

    public getAtributosBySolicitud(idUsuario: number, idSolicitud: number): Observable<Atributo[]>{
        return this.http.get<Atributo[]>('../api/v1/usuarios/${idUsuario}/solicitudes/${idSolicitud}/atributos');
    }

    public getAtributosById(idUsuario: number, idSolicitud: number, idAtributo: number): Observable<Atributo>{
        return this.http.get<Atributo>(`../api/v1/usuarios/${idUsuario}/solicitudes/${idSolicitud}/atributos/${idAtributo}`);
    }

    public postAtributo(idUsuario: number, idSolicitud: number, atributo: Atributo): Observable<Atributo[]>{
        return this.http.post<Atributo[]>('../api/v1/usuarios/${idUsuario}/solicitudes/${idSolicitud}/atributos', atributo);
    }

    public putAtributo(idAtributo: number, atributo: Atributo): Observable<Atributo[]>{
        return this.http.put<Atributo[]>('../api/v1/atributos/${idAtributo}', atributo);
    }

    public deleteAtributo(idAtributo: number): Observable<any>{
        return this.http.delete<Atributo[]>('../api/v1/atributos/${idAtributo}');
    }

}