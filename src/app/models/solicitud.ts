import { Validacion } from './validacion';
import { Atributo } from './atributo';

export class Solicitud {

    public id: number;
    public idUsuario: number;
    public tipo: number;
    public status: number;
    public statusDetalle: string;
    public porcentaje: number;
    public cantidad: number;
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