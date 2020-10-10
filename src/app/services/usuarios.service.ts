import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario';
import { Rol } from '../models/rol';
import { DatosUsuario } from '../models/datosusuario';
import { RolCat } from '../models/rolcat';
import { GenericPage } from '../models/generic-page';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(private http: HttpClient) { }

  public getUsuarios(page: number, size: number, filterParams?: any): Observable<any> {
    let pageParams: HttpParams = new HttpParams().append('page', page.toString()).append('size', size.toString());
    for (const key in filterParams) {
      if (filterParams[key] !== undefined) {
        const value: string = filterParams[key];
        if (value.length > 0 && value !== '*') {
          pageParams = pageParams.append(key, value);
        }
      }
    }
    return this.http.get(`../api/v1/usuarios`, { params: pageParams });
  }

  public myInfo(): Observable<Usuario> {
    return this.http.get<Usuario>(`../api/v1/usuarios/myInfo`);
  }

  public logout(): Observable<any> {
    return this.http.post('../api/logout', {});
  }

  public getUsuario(userid: number): Observable<Usuario> {
    return this.http.get<Usuario>(`../api/v1/usuarios/${userid}`);
  } 

  public insertarUsuario(user: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(`../api/v1/usuarios`, user);
  }

  public actualizaUser(user: Usuario): Observable<Usuario> {
    return this.http.put<Usuario>(`../api/v1/usuarios/${user.id}`, user);
  }

  //Roles

  public insertarRoles( idUser: number,rol: RolCat ): Observable<any> {
    return this.http.post(`../api/v1/usuarios/${idUser}/roles`, rol);
  }

  public  deleteRoles(userId: number, rolName: string): Observable <any> {
    return this.http.delete(`../api/v1/usuarios/${userId}/roles/${rolName}`);
  }

  public insertarDatosUsuario( idUser: number,dato: DatosUsuario): Observable<DatosUsuario> {
    return this.http.post<DatosUsuario>(`../api/v1/usuarios/${idUser}/datos`, dato);
  }

  public actualizaDatoUsuario(idusuario: number,dato: DatosUsuario): Observable<DatosUsuario> {
    return this.http.put<DatosUsuario>(`../api/v1/usuarios/${idusuario}/datos`, dato);
  }

  public  deleteDatosUsuario(Id: number): Observable <any> {
    return this.http.delete(`../api/v1/datos/${Id}`);
  }

}
