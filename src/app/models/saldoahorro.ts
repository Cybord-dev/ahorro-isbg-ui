export class SaldoAhorro {

    public id: number;
    public idUsuario: number;
    public tipo: string;
    public monto: number;
    public validado: boolean;
    public solicitante: string;
    public observaciones: string;
    public fechaCreacion: Date;
    public fechaActualizacion: Date;

    constructor(){
        this.monto = 0;
    }
}
