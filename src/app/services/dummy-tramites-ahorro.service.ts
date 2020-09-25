import { Injectable } from '@angular/core';
import { datusDummyUsuario } from '../models/datusDummyUsuario';
import { datusDummyTramite } from '../models/datusDummyTramite';

@Injectable({
  providedIn: 'root'
})

export class DummyTramitesAhorroService {

  public datusDummyUsuario:datusDummyUsuario[] = [ { 
    id: 0, 
    nombre: 'Alberto Ramirez', 
    tipousuario: 'Interno', 
    noEmpleado: 0, 
    oficina:'*', 
    descuentoQuincenal : 0,
    descuentoActual: 0,
    nuevoDescuento : 0,
    Montoderetiro:0,
    fechaInicio:  new Date('2020-11-15'),
    fechaModificacion:  new Date('2020-11-15'),
    estadoTramite: 'Por Solicitar'
  }];
  
  public datusDummyTramite:datusDummyTramite[] = [ ];
  

  constructor() { }
}
