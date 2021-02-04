import { SaldoAhorro } from './saldoahorro';

export class SaldoPrestamo {

    public id: number;
    public idPrestamo: number;
    public montoPrestamo: number;
    public saldoPendiente: number;
    public estatus: string;
    public noQuincenas: number;
    public tasaInteres: number;
    public noEmpleado: string;
    public nombreEmpleado: string;
    public tipo: string;
    public origen: string;
    public monto: number;
    public validado: boolean;
    public fechaCreacion: Date;
    public fechaActualizacion: Date;
    constructor() {
    }
}