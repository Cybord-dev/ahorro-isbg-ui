import { DatosUsuario } from './datosusuario';
import { Solicitud } from './solicitud';
import { INavData } from '@coreui/angular';

export class Usuario {

    public id: number;
    public activo: boolean;
    public nombre: string;
    public email: string;
    public urlImagenPerfil: string;
    public tipoUsuario: string;
    public fechaCreacion: Date;
    public fechaActualizacion: Date;
    public menu: INavData[];

    public roles: string[];
    public datosUsuario: DatosUsuario[];

    public solicitudes: Solicitud[];

    constructor() {
        this.datosUsuario = [];
        this.roles = [];
        this.menu = [];
    }
}