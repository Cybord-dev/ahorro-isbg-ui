
export class DatosUsuario {

    public id: number;
    public tipoDato: string;
    public dato: string;
    public relevancia: boolean;
    public fechaCreacion: Date;
    public fechaActualizacion: Date;

    constructor(tipoDato:string,dato:string,relevancia) {
         this.tipoDato= tipoDato;
        this.dato= dato;
        this.relevancia= relevancia;
    }
}