import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(private http: HttpClient) { }

  public getSolicitudes(filterParams: any): Observable<Usuario[]>{
    return this.http.get<Usuario[]>('../solicitudes');
  }
}
