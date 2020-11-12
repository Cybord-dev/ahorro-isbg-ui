import { Component, OnInit } from '@angular/core';
import { AhorroServicio } from '../../../services/ahorro.service';
import { SaldoAhorroCaja } from '../../../models/saldoahorrocaja';
import { CarouselConfig } from 'ngx-bootstrap/carousel';



@Component({
  selector: 'cybord-resumen',
  templateUrl: 'dashboard.component.html',
  providers: [
    { provide: CarouselConfig, useValue: { interval: false} }
  ]
})
export class DashboardComponent implements OnInit {

  //chart
  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true,
    legend: {
      labels: {
           fontColor: 'white'
          },
    },
    scales: {
      xAxes: [{
        ticks: {
          fontColor: "#FFF", // this here
        },
      }],
      yAxes: [{

          ticks: {
            fontColor: "#FFF", // this here
          },
      }],
    } 

     
  };
  public carOptions: any = {
    interval: false,
    keyboard: true,

  };
  public doughnutOptions: any = {
    legend: {
      labels: {
           fontColor: 'white'
          },
    },
    elements: {
      arc: {
          borderWidth: 0
      }
    }
  };
  public barChartType = 'bar';
  public barChartLegend = true;
  public barChartData: any = [];
  public barChartLabels: string[] = [];
  public colores: any[] = ['#a83242', '#3281a8', '#6da832','#324ea8'];
  
  //
  public errorMessages: string[] = [];
  public successMessage: string;

  private months: string[] = ['noviembre', 'diciembre','enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio','agosto', 'septiembre', 'octubre']
  
  private summary: SaldoAhorroCaja[] = [];
  private ahorros: number[] = [];
  private depositos: number[] = [];
  private retiros: number[] = [];
  private ajustes: number[] = [];

  public labelsTabla: string[] = [ "Retiros","Ahorros", "Depositos", "Ajustes"];

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
      var ajustesA = 0.0;
      var retirosA = 0.0;
      var depositosA = 0.0;
      var ahorrosA = 0.0;
      for(const a in this.summary){
        
        console.log(this.summary[a].tipo);
        if( this.monthChanger(Number(this.summary[a].mes))-1==i && this.summary[a].tipo === "ahorro"){
          ahorrosA = ahorrosA + this.summary[a].monto;
        }else if ( this.monthChanger(Number(this.summary[a].mes))-1==i && this.summary[a].tipo === "deposito"){
          depositosA = depositosA + this.summary[a].monto;
        }else if ( this.monthChanger(Number(this.summary[a].mes))-1==i && this.summary[a].tipo === "retiro"){
          retirosA = retirosA + this.summary[a].monto;
        }else if ( this.monthChanger(Number(this.summary[a].mes))-1==i && this.summary[a].tipo === "ajuste"){
          ajustesA = ajustesA + this.summary[a].monto;
        }
        
      }
      this.ajustes.push(ajustesA);
      this.retiros.push(retirosA);
      this.depositos.push(depositosA);
      this.ahorros.push(ahorrosA);
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
