export class Atributo {

    public id: number;
    public idSolicitud: number;
    public tipoAtributo: number;
    public nombre: string;
    public valor: string;
    public fechaCreacion: Date;
    public fechaActualizacion: Date;

    constructor(nombre?: string, valor?: string){
        this.nombre = nombre;
        this.valor = valor;
    }
}