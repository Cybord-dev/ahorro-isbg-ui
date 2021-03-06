import { Validacion } from './validacion';
import { Atributos } from './atributos';

export class Solicitud {

    public id: number;
    public idUsuario: number;
    public tipo: string;
    public noEmpleado: string;
    public nombre: string;
    public status: string;
    public statusDetalle: string;
    public fechaEjecucion: Date;
    public fechaCreacion: Date;
    public fechaActualizacion: Date;
    public tipoUsuario: string;
    public validaciones: Validacion[];
    public atributos: Atributos;

    constructor( tipo?: string) {
        this.tipo = tipo;
        this.validaciones = [];
        this.atributos = new Atributos();
    }
}