import { DatosUsuario } from './datos-usuario';
import { Solicitud } from './solicitud';
import { INavData } from '@coreui/angular';

export class Usuario {

    public id: number;
    public activo: boolean;
    public nombre: string;
    public email: string;
    public noEmpleado: string;
    public urlImagenPerfil: string;
    public tipoUsuario: string;
    public fechaCreacion: Date;
    public fechaActualizacion: Date;
    public menu: INavData[];

    public roles: string[];
    public datosUsuario: DatosUsuario;

    public solicitudes: Solicitud[];

    constructor() {
        this.datosUsuario = new DatosUsuario();
        this.roles = [];
        this.menu = [];
        this.tipoUsuario = 'INTERNO';
    }
}