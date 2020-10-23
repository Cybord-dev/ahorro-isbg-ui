export class AhorroExterno {

    public validado: boolean;
    public clave: string;
    public nombre: string;
    public importe: number;
    public observaciones: string;

    
    constructor(validado?:boolean, clave?: string, nombre?: string, importe?:number){
        this.validado = validado;
        this.clave = clave;
        this.nombre=nombre;
        this.importe = importe;
    }
}