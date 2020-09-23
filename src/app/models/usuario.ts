import { DatosUsuario } from './datosusuario';
import { Rol } from './rol';
import { Solicitud } from './solicitud';

export class Usuario {

    public id: number;
    public estatus: boolean;
    public nombre: string;
    public email: string;
    public tipoUsuario: string;
    public fechaCreacion: Date;
    public fechaActualizacion: Date;

    public roles: Rol[];
    public datosusuario: DatosUsuario[];
    public solicitudes: Solicitud[];

    constructor() {
        this.datosusuario = [];
        this.roles = [];
    }
}