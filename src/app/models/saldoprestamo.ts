import { SaldoAhorro } from './saldoahorro';

export class SaldoPrestamo {

    public id: number;
    public idPrestamo: number;
    public tipo: string;
    public monto: number;
    public validado: boolean;
    public fechaCreacion: Date;
    public fechaActualizacion: Date;

    public saldos: SaldoAhorro[];

    constructor(){
        this.saldos = [];
    }
}