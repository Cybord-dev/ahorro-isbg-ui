import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Recurso } from '../models/recurso';

@Injectable({
    providedIn: 'root'
})

export class RecursoService {

    constructor(private http: HttpClient) { }

    public getRecurso(idRecurso: number, tipoRecurso: string, tipoArchivo: string): Observable<Recurso> {
        return this.http.get<Recurso>(`../api/v1/recursos/tipoRecurso/${tipoRecurso}/tipoArchivo/${tipoArchivo}/referencias/${idRecurso}`);
    }
    public insertResourceFile(file: Recurso): Observable<any> {
        return this.http.post<any>('../api/v1/recursos', file);
    }
}