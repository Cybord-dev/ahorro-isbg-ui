import { Component, OnInit, ViewChild } from '@angular/core';
import { PrestamosService } from 'src/app/services/prestamos.service';
import { Prestamo } from 'src/app/models/prestamo';
import { SaldoPrestamo } from 'src/app/models/saldoprestamo';
import { UsuariosService } from '../../../services/usuarios.service';
import { ModalDirective } from 'ngx-bootstrap/modal/public_api';
import { Usuario } from 'src/app/models/usuario';

@Component({
  selector: 'cybord-prestamos-usuario',
  templateUrl: './prestamos-usuario.component.html',
  styleUrls: ['./prestamos-usuario.component.scss']
})
export class PrestamosUsuarioComponent implements OnInit {

  @ViewChild('modalConfirmacion') public modalConfirmacion: ModalDirective;

  constructor(
    private prestamoService: PrestamosService,
    private userService: UsuariosService
  ) { }

  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true,
    scales: {
      yAxes: [{
          ticks: {
              beginAtZero: true
          }
      }]
  }
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


  public chartData = new Map();

  ngOnInit(): void {
    this.loading = false;
    this.loadInfo();
  }

  public async loadInfo() {
    try {

      this.usuario = await this.userService.myInfo();
      this.prestamos = await this.prestamoService.getPrestamosPendientesByUsuario(this.usuario.id).toPromise();

      // this.createLabels();
      this.setCharData(this.prestamos);
      this.loading = false;
    } catch (error) {
      this.errorMessages.push(error);
      this.loading = false;
    }

  }
  private dateConverter(fecha: string): Date {
    let a = fecha.split("-");
    return new Date(Number(a[0]), Number(a[1]) - 1, Number(a[2]));
  }
  public cerrar(): void {
    this.modalConfirmacion.hide();
    this.infoPendiente = 0.0;
    this.infoTotal = 0.0;
  }

  public mostrarInformacion(p: Prestamo): void {
    this.informacion = p.saldosPrestamo.filter(e => e.tipo.includes('PAGO'));
    this.informacion.forEach(e => {
      this.infoTotal += e.monto;
    });
    this.infoPendiente = p.monto - this.infoTotal;
    this.modalConfirmacion.show();
  }

  public openModal(): void {
    this.modalConfirmacion.show();
  }

  private getYearAndMonth(fecha: Date): string {
    let temp = new Date(fecha);
    return temp.getFullYear() + "-" + (temp.getMonth() + 1);
  }

  private equals(fecha1: Date, fecha2: Date): Boolean {
    if (fecha1.getMonth() == fecha2.getMonth() && fecha1.getFullYear() == fecha2.getFullYear()) {
      return true;
    }
    return false;
  }

  private createLabels() {
    let temp = this.x0;
    while (!this.equals(temp, this.x1)) {
      this.barChartLabels.push(this.getYearAndMonth(temp));
      temp.setMonth(temp.getMonth() + 1);
    }
    if (this.equals(temp, this.x1)) {
      this.barChartLabels.push(this.getYearAndMonth(temp));
    }
  }

  private setMontoCharData(key: string, monto: number) {

    let data: number[] = this.chartData.get(key);
    if (data === undefined || data === null) {
      data = [];
      data.push(monto);
      this.chartData.set(key, data);
    } else {
      data.push(monto);
    }

  }


  private setCharData(prestamos: Prestamo[]) {

    prestamos.forEach(e => {

      let anioMes: string = this.getYearAndMonth(this.dateConverter(e.fechaCreacion.toString()));
      this.setMontoCharData(anioMes, e.monto);

      e.saldosPrestamo
        .filter(m => m.tipo !== 'INTERES')
        .forEach(m => {
          let k = this.getYearAndMonth(this.dateConverter(m.fechaCreacion.toString()));
          this.setMontoCharData(k, -1 * m.monto);
        });
      let labels: string[] = [];
      for (const key of this.chartData.keys()) {
        labels.push(key);
      }

      // ordena de menos a mayor
      labels.sort();

      console.log(labels);

      // hacer un for de labels, y recuperar con el año mes el monto del prestamo

      let data = [];
      let acumulado = 0;
      labels.forEach(mes =>{
        acumulado = this.chartData.get(mes).reduce((a,b)=>a+b);
        data.push(acumulado);
      });
    });


    //   this.montos.push({monto:e.monto, fecha:this.getYearAndMonth(this.dateConverter(e.fechaCreacion.toString()))});
    //   this.total += e.monto;
    //   this.totalPendiente += e.saldoPendiente;
    //   fechas.push(e.fechaCreacion.toString());

    //   );     
    // });

    // console.log('Montos :',this.montos);

    // var fechasMap = fechas.map(this.dateConverter);
    // this.x1 = new Date(Math.max.apply(null,fechasMap));
    // this.x0 = new Date(Math.min.apply(null,fechasMap));

    // console.log('fechas',fechasMap);


    // let datos: any[] = [];
    // let acumulado = 0;
    // for(let i = 0; i<this.barChartLabels.length; i++){
    //   const saldos: number[] = this.montos.filter(a => a.fecha === this.barChartLabels[i]).map(a => a.monto);
    //   if(saldos.length > 0){
    //     acumulado = acumulado + saldos.reduce((a, b) => a + b);
    //     datos.push(acumulado);
    //   }else{
    //     datos.push(acumulado);
    //   }
    // }
    // console.log("labels: "+this.barChartLabels);
    // console.log("datos: "+datos);
    // this.barChartData = [{ data: datos, backgroundColor: "#46BFBD", label: 'Deuda prestamos' }];

  }
}
