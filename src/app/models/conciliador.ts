export class Conciliador {

    public id: number;
    public idUsuario: number;
    public noEmpleado: string;
    public nombre: string;
    public saldo: number;
    public validado: boolean;
    public observaciones: string;


    constructor(noEmpleado?: string, nombre?: string, saldo?: number, validado?: boolean){
        this.noEmpleado = noEmpleado;
        this.nombre = nombre;
        this.saldo = saldo;
        this.validado = false;
    }


}
