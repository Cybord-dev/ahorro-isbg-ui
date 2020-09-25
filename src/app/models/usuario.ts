import { DatosUsuario } from './datosusuario';
import { Solicitud } from './solicitud';

export class Usuario {

    public id: number;
    public activo: boolean;
    public nombre: string;
    public email: string;
    public tipoUsuario: string;
    public fechaCreacion: Date;
    public fechaActualizacion: Date;

    public roles: string[];
    public datosusuario: DatosUsuario[];
    public solicitudes: Solicitud[];

    constructor() {
        this.datosusuario = [];
        this.roles = [];
    }
}