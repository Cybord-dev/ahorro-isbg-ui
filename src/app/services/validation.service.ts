import { Injectable } from '@angular/core';
import { Solicitud } from '../models/solicitud';
import { Usuario } from '../models/usuario';
import { UsuariosComponent } from '../pages/commons/usuarios/usuarios.component';

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

  public validarUsuario(usuario: Usuario): string[]{
    const alerts: string[] = []
    const regexNombre=  new RegExp('^([0-9a-zA-ZÀ-ú.,&-_ ]+)$');
    const regexCuenta=  new RegExp('^([0-9]{12})$');
    const regexEmail = new RegExp('^[a-z0-9A-Z._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$');

    if( (!regexEmail.test(usuario.email) || usuario.email === undefined)
      && usuario.email.length < 2 && usuario.email.length > 100){
      alerts.push('El email no es valido');
    }
    if ( !regexNombre.test(usuario.nombre) || usuario.nombre === undefined
      || usuario.nombre.length < 2 || usuario.nombre.length > 100){
      alerts.push('El nombre no es valido');
    }
    if( usuario.noEmpleado === undefined){
      alerts.push('El No. de empleado no ha sido asignado');
    }
    if (usuario.datosUsuario.OFICINA === "*" || usuario.datosUsuario.OFICINA === undefined){
      alerts.push('La oficina no ha sido asignado');
    }
    if (usuario.datosUsuario.BANCO === "*" || usuario.datosUsuario.BANCO === undefined){
      alerts.push('El banco no ha sido asignado');
    }
    if (usuario.datosUsuario.TIPO_CUENTA === "*" || usuario.datosUsuario.TIPO_CUENTA === undefined){
      alerts.push('El tipo de cuenta no esta definido');
    }
    if( !regexCuenta.test(usuario.datosUsuario.CUENTA)){
      alerts.push('El no. de cuenta es invalido');
    }
    if ( Number(usuario.datosUsuario.SUELDO) < 100 ){
      alerts.push('El saldo no es valido (MENOR A 100)');
    }
    return alerts;
  }
}
