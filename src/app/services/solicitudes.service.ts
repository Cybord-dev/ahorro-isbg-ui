import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Solicitud } from '../models/solicitud';

@Injectable({
  providedIn: 'root'
})
export class SolicitudesService {

  constructor(private http: HttpClient) { }

  public getSolicitudes(filterParams: any): Observable<Solicitud[]>{
    return this.http.get<Solicitud[]>('../solicitudes');
  }

  public getSolicitudesByUsuario(idUsuario: number): Observable<Solicitud[]>{
    return this.http.get<Solicitud[]>(`../usuarios/${idUsuario}/solicitudes`);
  }
}
