import { Observable } from 'rxjs';
import { DatosUsuario } from '../models/datosusuario';
import { GenericPage } from '../models/generic-page';
import { Rol } from '../models/rol';
import { Usuario } from '../models/usuario';


type NewType = Observable<Usuario>;

export abstract class UsuariosData {

  abstract getUsuario(user: number): Observable<Usuario>;
  abstract getUsuarios(page: number, size: number, filterParams?: any): Observable<GenericPage<Usuario>>;

  abstract insertarUsuario(user: Usuario): NewType;
  abstract actualizaUser(user: Usuario): Observable<Usuario>;

  abstract insertarRoles(id: number,rol: Rol ): Observable<Usuario>;
  abstract deleteRoles (rolId: number): Observable<Usuario>;

  abstract insertarDatosUsuario(idUser: number,dato: DatosUsuario): Observable<Object>;
  abstract actualizaDatoUsuario (idusuario: number,dato: DatosUsuario): Observable<Object>;
  abstract deleteDatosUsuario (idDato: number): Observable<any>;
  
  
  
}