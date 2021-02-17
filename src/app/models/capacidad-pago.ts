import { Usuario } from './usuario';

export class CapacidadPago {

    public capacidadPago: number;
    public sueldo: number;
    public sueldoUtilizable: number;
    public ahorro: any;
    public avalados: any[];
    public prestamosActivos: any[];
    constructor(){
        this.ahorro = null;
        this.avalados = [];
        this.prestamosActivos = []
    }
    
}