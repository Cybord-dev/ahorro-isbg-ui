import { Component, OnInit } from '@angular/core';
import { AhorroServicio } from '../../../services/ahorro.service';
import { ReporteSaldos } from '../../../models/reportesaldos';
import { SaldoAhorroCaja } from '../../../models/saldoahorrocaja';



@Component({
  selector: 'cybord-resumen',
  templateUrl: 'dashboard.component.html'
})
export class DashboardComponent implements OnInit {

  //chart
  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartType = 'bar';
  public barChartLegend = true;
  public barChartData: any = [];
  public barChartLabels: string[] = [];
  
  //
  public errorMessages: string[] = [];
  public successMessage: string;

  private months: string[] = ['noviembre', 'diciembre','enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio','agosto', 'septiembre', 'octubre']
  
  private summary: SaldoAhorroCaja[] = [];
  private summaryAgrupado: SaldoAhorroCaja[] = [];
  private ahorros: number[] = [];
  private depositos: number[] = [];
  private retiros: number[] = [];
  private ajustes: number[] = [];

  public labelsTabla: string[] = ["Ahorros", "Depositos", "Ajustes", "Retiros"];

  public doughnutChartLabels: string[] = ["Retiros","Ahorros", "Depositos", "Ajustes"];
  public doughnutChartData: any = [];
  public doughnutChartType = 'doughnut';

  constructor(private saldosAhorro: AhorroServicio){
    console.log('stating dashboard222');
    
  }
  
  ngOnInit(): void {
    this.saldosAhorro.getSaldoCaja().toPromise().
    then(reporte => {
      this.summary = reporte;
      this.setCharInfo();
      var retirosG = {
        label: 'Retiros',
        data: this.retiros,
        backgroundColor: '#a83242',
        borderColor: '#000000',
      };
      var ahorrosG = {
        label: 'Ahorros',
        data: this.ahorros,
        backgroundColor: '#3281a8',
        borderColor: '#000000',
      };

      var depositosG = {
        label: 'Depositos',
        data: this.depositos,
        backgroundColor: '#6da832',
        borderColor: '#000000',
      };

      var ajustesG = {
        label: 'Ajustes',
        data: this.ajustes,
        backgroundColor: '#324ea8',
        borderColor: '#000000',
      };

      this.barChartData = [retirosG, ahorrosG, depositosG, ajustesG];
      
    }).catch((error) => this.errorMessages.push(error));

    this.saldosAhorro.getSaldoCajaAgrupado().toPromise().
    then(reporte => {
      var deposito = 0.0;
      var ahorro = 0.0;
      var retiro = 0.0;
      var ajuste = 0.0;
      for(let dato of reporte){
        if(dato.tipo === "ahorro"){
          ahorro = dato.monto;
        }else if(dato.tipo === "retiro"){
          retiro  = dato.monto;
        }else if(dato.tipo === "deposito"){
          deposito  = dato.monto;
        }else if(dato.tipo === "ajuste"){
          ajuste  = dato.monto;
        }
      }
      this.doughnutChartData = [retiro, ahorro, deposito, ajuste];
    }).catch((error) => this.errorMessages.push(error));
    this.barChartData = [{data:[0], label: ["enero"]}];
    this.doughnutChartData = [0,0,0,0];
    this.doughnutChartData = [0,0,0,0];
    
  }

  private setCharInfo(): void{
    var today = new Date();
    var todaysMonth = this.monthChanger(today.getMonth());
    for(var i = 0; i <= todaysMonth; i++){
      this.barChartLabels.push(this.months[i]);
    }

    for(var i = 0; i<this.barChartLabels.length; i++){
      for(const a in this.summary){
        if( this.monthChanger(Number(this.summary[a].mes)-1)==i && this.summary[a].tipo === "ahorro"){
          this.ahorros.push(this.summary[a].monto);
        }else if ( this.monthChanger(Number(this.summary[a].mes)-1)==i && this.summary[a].tipo === "deposito"){
          this.depositos.push(this.summary[a].monto);
        }else if ( this.monthChanger(Number(this.summary[a].mes)-1)==i && this.summary[a].tipo === "retiro"){
          this.retiros.push(this.summary[a].monto);
        }else if ( this.monthChanger(Number(this.summary[a].mes)-1)==i && this.summary[a].tipo === "ajuste"){
          this.ajustes.push(this.summary[a].monto);
        }
      }
    }
  }

  private monthChanger(num): number {
    for(let x = 0; x<2; x++){
      num++;
      num = (num > 11) ? 0 : num;
    }
    return num;
  }

  
}
