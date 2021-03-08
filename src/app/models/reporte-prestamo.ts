export class ReportePrestamo{

    public idUsuario: number;
	public tipoUsuario: string;
	public noEmpleado: string;
	public nombre: string;

	public idSolicitud: number;
	public noQuincenas:number;
	public tasaInteres:number;
	public tipo: string;

	public montoPrestamo: number;
	public interesPrestamo : number;
	public saldoPendiente: number;
	public interes: number;
	public pagos: number;
	public ajuste: number;
	public totalPagado: number;
	
	public fechaCreacion: string;
	public fechaActualizacion: string;
}