import { Injectable } from '@angular/core';
import { Solicitud } from '../models/solicitud';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  constructor() { }



  public validateSolicitud(solicitud: Solicitud, totalAhorro: number): string[]{
    const alerts: string[] = [];
    if ('RetiroParcialAhorro' === solicitud.tipo && +solicitud.atributos.MONTO > totalAhorro){
      alerts.push(`No es posible solicitar un monto superior al total de su ahorro de $${totalAhorro}`);
    }
    if (solicitud.atributos.MONTO === undefined){
      alerts.push('El monto de la solicitud no ha sido asignado');
    }
    if ('CancelacionAhorro' === solicitud.tipo && +solicitud.atributos.RAZON_CANCELACION.length < 10){
      alerts.push(`Razon o motivos de cancelacion de ahorros insuficientes`);
    }
    return alerts;
  }
}
