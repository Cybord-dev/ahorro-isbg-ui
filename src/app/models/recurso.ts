export class Recurso {
    public id: number;
    public referencia: string;
    public tipoArchivo: string;
    public tipoRecurso: string;
    public dato: string;
    public fechaCreacion: Date;


    constructor(tipoArchivo?: string, tipoRecurso?: string){
        this.tipoArchivo = tipoArchivo;
        this.tipoRecurso = tipoRecurso;
    }
}