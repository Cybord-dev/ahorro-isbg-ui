import { DatosUsuario } from './datosusuario';
import { Solicitud } from './solicitud';

export class Usuario {

    public id: number;
    public activo: boolean;
    public nombre: string;
    public email: string;
    public urlImagenPerfil: string;
    public menu: any;
    public tipoUsuario: string;
    public fechaCreacion: Date;
    public fechaActualizacion: Date;


    public roles: string[];
    public datosUsuario: DatosUsuario[];

    public solicitudes: Solicitud[];

    constructor() {
        this.datosUsuario = [];
        this.roles = [];
        this.menu = [];
    }
}