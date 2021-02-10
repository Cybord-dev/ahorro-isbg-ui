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
    return this.http.get<Catalogo[]>(`../api/v1/catalogos/${tipo}`);
  }

  public getCatalogoByTipoAndNombre(tipo: string, nombre: string): Observable<Catalogo>{
    return this.http.get<Catalogo>(`../api/v1/catalogos/${tipo}/${nombre}`);
  }

  public postCatalogo(catalogo: Catalogo): Observable<Catalogo[]>{
    return this.http.post<Catalogo[]>(`../api/v1/catalogos`, catalogo);
  }

  public deleteCatalogo(id: number): Observable<any>{
    return this.http.delete<Catalogo[]>(`../api/v1/catalogos/${id}`);
  }

  public updateCatalogo(catalogo:Catalogo): Observable<Catalogo>{
    return this.http.put<Catalogo>(`../api/v1/catalogos/${catalogo.tipo}/${catalogo.nombre}`, catalogo);
  }

}
