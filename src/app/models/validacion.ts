export class Validacion {

    public id: number;
    public idUsuario: number;
    public idSolicitud: number;
    public numeroValidacion: number;
    public email: string;
    public area: string;
    public status: boolean;
    public tipoValidacion: string;
    public fechaCreacion: Date;
    public fechaActualizacion: Date;

    constructor(idUsuario?: number, idSolicitud ?: number, area ?: string, email?: string, status?: boolean) {
        this.idUsuario = idUsuario;
        this.idSolicitud = idSolicitud;
        this.area = area;
        this.email = email;
        this.status = status;
    }
}
