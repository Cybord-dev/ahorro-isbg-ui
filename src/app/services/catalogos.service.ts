import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Catalogo } from '../models/catalogo';

@Injectable({
  providedIn: 'root'
})
export class CatalogosService {

  constructor(private http: HttpClient) { }

  public getCatalogosByTipo(tipo: string): Observable<Catalogo[]>{
    return this.http.get<Catalogo[]>(`../catalogos/${tipo}`);
  }

  public getCatalogoByTipoAndNombre(tipo: string, nombre: string): Observable<Catalogo[]>{
    return this.http.get<Catalogo[]>(`../catalogos/${tipo}/${nombre}`);
  }

  public postCatalogo(catalogo: Catalogo): Observable<Catalogo[]>{
    return this.http.post<Catalogo[]>(`../catalogos`, catalogo);
  }

  public deleteCatalogo(id: number): Observable<any>{
    return this.http.delete<Catalogo[]>(`../catalogos/${id}`);
  }

}
