import { Component, OnInit } from '@angular/core';
import { AhorroServicio } from '../../../services/ahorro.service';
import { ReporteSaldos } from '../../../models/reportesaldos';


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
  public barChartData: any[] = [];
  public barChartLabels: string[] = [];
  
  //
  public errorMessages: string[] = [];
  public successMessage: string;

  private months: string[] = ['noviembre', 'diciembre','enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio','agosto', 'septiembre', 'octubre']
  
  private reporte: ReporteSaldos[] = [];
  private ahorros: number[] = [];
  private depositos: number[] = [];
  private retiros: number[] = [];
  private ajustes: number[] = [];


  constructor(private saldosAhorro: AhorroServicio){
    console.log('stating dashboard');
  }
  
  ngOnInit(): void {
    this.saldosAhorro.getReporteSaldos().toPromise().
    then(reporte => {
      this.reporte = reporte;
      this.setCharInfo();
      
      this.barChartData = [
        { data: this.depositos, label: "depositos", backgroundColor: "#0000ff"},
        { data: this.ahorros, label: "ahorros", backgroundColor: "#00ff00"},
        { data: this.retiros, label: "retiros", backgroundColor: "#ff0000"},
        { data: this.ajustes, label: "ajustes", backgroundColor: "#ff0000"}
      ];
    }).catch((error) => this.errorMessages.push(error));
    this.barChartData = [{data:[22, 11], label: ["enero"]}];
    
  }

  private setCharInfo(): void{
    var today = new Date();
    var todaysMonth = this.monthChanger(today.getMonth());
    var todaysYear = today.getFullYear();
    for(var i = 0; i <= todaysMonth; i++){
      this.barChartLabels.push(this.months[i]);
      this.depositos.push(0);
      this.retiros.push(0);
      this.ajustes.push(0);
    }
    for(var i = 0; i<this.barChartLabels.length; i++){
      var depositos = 0.0;
      var retiros = 0.0;
      var ahorros = 0.0;
      var ajustes = 0.0;
      for(const a in this.reporte){
        if( this.monthChanger(this.getMonth(this.reporte[a].fecha))==(i) && this.reporte[a].tipo === "ahorro"){
          ahorros += this.reporte[a].monto;
        }else if ( this.monthChanger(this.getMonth(this.reporte[a].fecha))==(i+1) && this.reporte[a].tipo === "deposito"){
          depositos += this.reporte[a].monto;
        }else if ( this.monthChanger(this.getMonth(this.reporte[a].fecha))==(i+1) && this.reporte[a].tipo === "retiro"){
          retiros += this.reporte[a].monto;
        }else if ( this.monthChanger(this.getMonth(this.reporte[a].fecha))==(i+1) && this.reporte[a].tipo === "ajuste"){
          ajustes += this.reporte[a].monto;
        }
      }
      this.retiros.push(retiros);
      this.depositos.push(depositos);
      this.ahorros.push(ahorros);
      this.ajustes.push(ajustes);
    }
  }

  private monthChanger(num): number {
    for(let x = 0; x<2; x++){
      num++;
      num = (num > 11) ? 0 : num;
    }
    return num;
  }

  private getMonth(fecha): number{
    var a = fecha.split("-");
    return a[1];
  }

}
