export class AhorroExterno {

    public aceptar: boolean;
    public clave: string;
    public NSS: string;
    public nombre: string;
    public ahorra:string;
    public importe: number;
    
    constructor(aceptar?:boolean, clave?:string, NSS?: string, nombre?: string,ahorra?:string, importe?:number){
        this.aceptar = aceptar;
        this.clave = clave;
        this.NSS = NSS;
        this.nombre=nombre;
        this.ahorra= ahorra;
        this.importe = importe;
        this.aceptar = aceptar;
    }
}