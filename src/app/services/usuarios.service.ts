import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario';
import { Rol } from '../models/rol';
import { DatosUsuario } from '../models/datosusuario';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(private http: HttpClient) { }

  public getUsuarios(page: number, size: number, filterParams?: any): Observable<Object> {
    let pageParams: HttpParams = new HttpParams().append('page', page.toString()).append('size', size.toString());
    for (const key in filterParams) {
      if (filterParams[key] !== undefined) {
        const value: string = filterParams[key];
        if (value.length > 0 && value !== '*') {
          pageParams = pageParams.append(key, value);
        }
      }
    }
    return this.http.get('../usuarios', { params: pageParams });
  }

  public getUsuario(userid: number): Observable<Object> {
    return this.http.get(`../usuarios/${userid}`);
  } 

  public insertarUsuario(user: Usuario): Observable<Object> {
    return this.http.post('../usuarios', user);
  }

  public actualizaUser(user: Usuario): Observable<Object> {
    return this.http.put(`../usuarios/${user.id}`, user);
  }

  //Roles

  public insertarRoles( idUser: number,rol: Rol): Observable<Object> {
    return this.http.post(`../usuarios/${idUser}/roles`,rol);
  }

  public  deleteRoles(rolId: number): Observable <any> {
    return this.http.delete(`../rol/${rolId}`);
  }

  //datosUsuario

  public insertarDatosUsuario( idUser: number,dato: DatosUsuario): Observable<Object> {
    return this.http.post(`../usuarios/${idUser}/datos`,dato);
  }

  public actualizaDatoUsuario(idusuario: number,dato: DatosUsuario): Observable<Object> {
    return this.http.put(`../usuarios/${idusuario}/datos`, dato);
  }

  public  deleteDatosUsuario(Id: number): Observable <any> {
    return this.http.delete(`../datos/${Id}`);
  }

}
