import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Recurso } from '../models/recurso';

@Injectable({
    providedIn: 'root'
  })

export class RecursoService {

    constructor(private http: HttpClient) { }

    public getSolicitudPDFbyId(idSolicitud: number): Observable<Recurso>{
        return this.http.get<Recurso>(`../api/v1/recursos/tipoRecurso/Solicitud/tipoArchivo/PDF/referencias/${idSolicitud}`);
    }

}