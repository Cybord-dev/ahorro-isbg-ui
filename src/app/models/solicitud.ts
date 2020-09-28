import { Validacion } from './validacion';
import { Atributo } from './atributo';

export class Solicitud {

    public id: number;
    public idUsuario: number;
    public tipo: string;
    public status: string;
    public statusDetalle: string;

    public fechaEjecucion: Date;
    public fechaCreacion: Date;
    public fechaActualizacion: Date;

    public validaciones: Validacion[];
    public atributos: Atributo[];

    constructor() {
        this.validaciones = [];
        this.atributos = [];
    }
}