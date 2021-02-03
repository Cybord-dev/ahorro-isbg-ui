import { Component, OnInit, ViewChild } from '@angular/core';
import { PrestamosService } from 'src/app/services/prestamos.service';
import { Prestamo } from 'src/app/models/prestamo';
import { SaldoPrestamo } from 'src/app/models/saldoprestamo';
import { UsuariosService } from '../../../services/usuarios.service';
import { ModalDirective } from 'ngx-bootstrap/modal/public_api';
import { Usuario } from 'src/app/models/usuario';
import { getMonth } from 'ngx-bootstrap/chronos';

@Component({
  selector: 'cybord-prestamos-usuario',
  templateUrl: './prestamos-usuario.component.html',
  styleUrls: ['./prestamos-usuario.component.scss']
})
export class PrestamosUsuarioComponent implements OnInit {

  @ViewChild('modalConfirmacion') public modalConfirmacion: ModalDirective;

  constructor(
    private prestamoService:PrestamosService,
    private userService: UsuariosService
  ) { }

  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels: string[] = [];
  public barChartData: any[] = [{ data: [], label: 'Deuda' }];

  public errorMessages: string[] = [];  
  public loading = false;
  public prestamos: Prestamo[] = [];
  public total: number = 0;
  public totalPendiente: number = 0;
  public informacion: SaldoPrestamo[] = [];
  private usuario: Usuario;
  public infoTotal: number = 0.0;
  public infoPendiente: number = 0.0;
  public x0: Date;
  public x1: Date;
  public montos: any[] = [];

  ngOnInit(): void {
    this.loading = true;
    this.loadInfo();
  }

  public async loadInfo(){
    try{
      let fechas: Date[] = [];
      this.usuario = await this.userService.myInfo();
      this.prestamos = await this.prestamoService.getPrestamosPendientesByUsuario(this.usuario.id).toPromise();
      this.prestamos.forEach(e => {
        this.total += e.monto;
        this.totalPendiente += e.saldoPendiente;
        fechas.push(e.fechaCreacion);
        e.saldosPrestamo.forEach(b => 
          fechas.push(b.fechaCreacion)
        );
        
      });
      var fechasMap = fechas.map(function(x) { return new Date(x); })
      this.x1 = new Date(Math.max.apply(null,fechasMap));
      this.x0 = new Date(Math.min.apply(null,fechasMap));
      this.createLabels();
      this.setCharData();
      this.loading = false;
    }catch(error){
      this.errorMessages.push(error);
      this.loading = false;
    }
    
  }

  public cerrar(): void {
    this.modalConfirmacion.hide();
    this.infoPendiente = 0.0;
    this.infoTotal = 0.0;
  }

  public mostrarInformacion(p:Prestamo):void{
    this.informacion = p.saldosPrestamo.filter(e => e.tipo.includes('PAGO'));
    this.informacion.forEach(e =>{
      this.infoTotal += e.monto;
    });
    this.infoPendiente = p.monto - this.infoTotal;
    this.modalConfirmacion.show();
  }

  public openModal(): void {
    this.modalConfirmacion.show();
  }

  private getYearAndMonth(fecha:Date):string{
    return fecha.getFullYear()+"-"+(fecha.getMonth()+1);
  }

  private setToZero(fecha:Date):Date{
    let a = new Date(fecha);
    a.setHours(0);
    a.setMinutes(0);
    a.setMilliseconds(0);
    a.setDate(1);
    return a;
  }

  private createLabels(){
    this.x0 = this.setToZero(this.x0);
    this.x1 = this.setToZero(this.x1);
    while( !(this.x0.getTime()===this.x1.getTime()) ){
      this.barChartLabels.push(this.getYearAndMonth(this.x0));
      this.x0.setMonth(this.x0.getMonth()+1);
    }
  }
  private setCharData(){
    
  }
}
