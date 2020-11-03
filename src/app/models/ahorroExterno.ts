export class AhorroExterno {

    public validado: boolean;
    public idUsuario: number;
    public numeroUsuario: string;
    public nombre: string;
    public importe: number;
    public observaciones: string;


    constructor(validado?: boolean, numeroUsuario?: string, nombre?: string, importe?: number){
        this.validado = validado;
        this.numeroUsuario = numeroUsuario;
        this.nombre = nombre;
        this.importe = importe;
    }
}
