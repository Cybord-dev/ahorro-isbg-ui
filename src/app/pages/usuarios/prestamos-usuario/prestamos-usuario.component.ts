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
  public barChartData: any[] = [{ data: [], label: 'Deuda prestamos' }];
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
    this.loading = false;
    this.loadInfo();
  }

  public async loadInfo(){
    try{
      let fechas: string[] = [];
      this.usuario = await this.userService.myInfo();
      this.prestamos = await this.prestamoService.getPrestamosPendientesByUsuario(this.usuario.id).toPromise();
      this.prestamos.forEach(e => {
        this.montos.push({monto:e.monto, fecha:this.getYearAndMonth(this.dateConverter(e.fechaCreacion.toString()))});
        this.total += e.monto;
        this.totalPendiente += e.saldoPendiente;
        fechas.push(e.fechaCreacion.toString());
        e.saldosPrestamo.forEach(b =>{
          fechas.push(b.fechaCreacion.toString());
          this.montos.push({monto:(-1.0*b.monto), fecha:this.getYearAndMonth(this.dateConverter(b.fechaCreacion.toString()))});
        }
        );     
      });
      var fechasMap = fechas.map(this.dateConverter);
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
  private dateConverter(fecha:string):Date{
    let a = fecha.split("-");
    return new Date(Number(a[0]), Number(a[1])-1, Number(a[2]));
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
    let temp = new Date(fecha);
    return temp.getFullYear()+"-"+(temp.getMonth()+1);
  }

  private equals(fecha1:Date, fecha2:Date):Boolean{
    if( fecha1.getMonth() == fecha2.getMonth() && fecha1.getFullYear()==fecha2.getFullYear() ){
      return true;
    }
    return false;
  }

  private createLabels(){
    let temp = this.x0;
    while( !this.equals(temp,this.x1) ){
      this.barChartLabels.push(this.getYearAndMonth(temp));
      temp.setMonth(temp.getMonth()+1);
    }
    if(this.equals(temp,this.x1)){
      this.barChartLabels.push(this.getYearAndMonth(temp));
    }
  }
  private setCharData(){
    //this.montos.forEach(m => console.log("fecha: "+m.fecha+ "- monto: "+m.monto));
    let datos: any[] = [];
    let acumulado = 0;
    for(let i = 0; i<this.barChartLabels.length; i++){
      const saldos: number[] = this.montos.filter(a => a.fecha === this.barChartLabels[i]).map(a => a.monto);
      if(saldos.length > 0){
        acumulado = acumulado + saldos.reduce((a, b) => a + b);
        datos.push(acumulado);
      }else{
        datos.push(acumulado);
      }
    }

    
    console.log("labels: "+this.barChartLabels);
    console.log("datos: "+datos);
    this.barChartData = [{ data: datos, label: 'Deuda prestamos' }];

  }
}
