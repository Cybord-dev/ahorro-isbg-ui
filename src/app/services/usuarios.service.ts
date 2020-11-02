import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario';
import { RolCat } from '../models/rolcat';
import { DatoUsuario } from '../models/dato-usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(private http: HttpClient) { }

  private getHttpParams(filterParams: any): HttpParams {
    let pageParams: HttpParams =  new HttpParams();
    for (const key in filterParams) {
      if (filterParams[key] !== undefined) {
      const value: string = filterParams[key].toString();
      if ( value !== null && value.length > 0 && value !== '*') {
          pageParams = pageParams.append(key, value);
        }
      }
    }
    return pageParams;
  }

  public getUsuarios(filterParams?: any): Observable<any> {
    return this.http.get(`../api/v1/usuarios`, { params: this.getHttpParams(filterParams) });
  }

  public myInfo(): Observable<Usuario> {
    return this.http.get<Usuario>(`../api/v1/usuarios/myInfo`);
  }

  public logout(): Observable<any> {
    return this.http.get('../logout');
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

  public insertarDatoUsuario( idUser: number, dato: DatoUsuario): Observable<DatoUsuario> {
    return this.http.post<DatoUsuario>(`../api/v1/usuarios/${idUser}/datos`, dato);
  }

  public actualizaDatoUsuario(idusuario: number,tipoDato: string , dato: DatoUsuario): Observable<DatoUsuario> {
    return this.http.put<DatoUsuario>(`../api/v1/usuarios/${idusuario}/datos/${tipoDato}`, dato);
  }

  public  deleteDatoUsuario(Id: number): Observable <any> {
    return this.http.delete(`../api/v1/datos/${Id}`);
  }

}
