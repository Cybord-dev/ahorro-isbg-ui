
export class DatosUsuario {
    public tipoDato: string;
    public dato: string;
    public relevancia: boolean;

    public constructor(){}

    public set(tipo:string, dato:string, relevancia:boolean){
        this.tipoDato = tipo;
        this.dato = dato;
        this.relevancia = relevancia;
        return this;
    }
}