import { Observable } from 'rxjs';
import { GenericPage } from '../models/generic-page';
import { Usuario } from '../models/usuario';


export abstract class SolicitudesData {

  
  abstract getSolicitudes(page: number, size: number, filterParams?: any): Observable<GenericPage<any>>;

  
  
}