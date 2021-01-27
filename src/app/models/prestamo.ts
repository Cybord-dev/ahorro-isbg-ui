import { SaldoPrestamo } from './saldoprestamo';

export class Prestamo{
    public id:number;
	public idDeudor:number;
	public estatus:string;
	public monto:number;
	public saldoPendiente:number;
	public noQuincenas:number;
	public tasaInteres:number;
	public fechaTerminacion:Date;
	public fechaCreacion:Date;
	public fechaActualizacion:Date;
	public saldosPrestamo:SaldoPrestamo[];
    
    constructor(){
        this.saldosPrestamo=[];
    }
}