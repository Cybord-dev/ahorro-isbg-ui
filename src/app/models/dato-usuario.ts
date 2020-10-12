export class DatoUsuario {

    public id: number;
    public tipoDato: string;
    public dato: string;
    public relevancia: number;
    public fechaCreacion: Date;
    public fechaActualizacion: Date;

    constructor(tipoDato: string, dato: string, relevancia?: number){
        this.tipoDato = tipoDato;
        this.dato = dato;
        this.relevancia = relevancia || 0;
    }

}
