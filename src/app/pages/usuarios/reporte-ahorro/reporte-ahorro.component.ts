import { Component, OnInit } from '@angular/core';
import { AhorroServicio } from '../../../services/ahorro.service';
import { SaldoAhorro } from '../../../models/saldoahorro';
import { NumberSymbol } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'cybord-reporte-ahorro',
  templateUrl: './reporte-ahorro.component.html',
  styleUrls: ['./reporte-ahorro.component.scss']
})
export class ReporteAhorroComponent implements OnInit {


  // barChart
  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels: string[]= [];
  public barChartType = 'bar';
  public barChartLegend = true;
  public datos: number[] = [];
  public errorMessages: string[] = [];
  public successMessage: string;

  public barChartData: any[] = [];
  private months: string[] = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio','agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre']
  private ahorros: SaldoAhorro[] = [];
  public datosTabla: {mes:string, cant:number}[] = [];
  constructor(private saldosAhorro: AhorroServicio) {

  }

  ngOnInit(): void {
    console.log('inicio');
    this.saldosAhorro.getSaldoByUsuario(1).subscribe(resultado => {
      this.ahorros = resultado
      this.setCharInfo();
      this.barChartData = [{ data:this.datos, label: this.barChartLabels }];
    });
    this.barChartData = [{ data:["100", "200", "300"], label: ["enero", "febrero", "marzo"] }];
  }

  private setCharInfo(): void{
    var today = new Date();
    var todaysMonth = today.getMonth();
    var todaysYear = today.getFullYear();
    for(var i = 0; i <= todaysMonth; i++){
      this.barChartLabels.push(this.months[i]);
      this.datos.push(0);
    }
    for(var i = 0; i < this.datos.length; i++){
      var currentQ = 0;
      if(i != 0){
        for(let ahorro of this.ahorros){
          var fecha = new Date(ahorro.fechaCreacion);
          if(fecha.getMonth() <= todaysMonth && fecha.getFullYear() == todaysYear){
            if(fecha.getMonth() == i){
              currentQ += ahorro.monto;
            }
          }
        }
        currentQ += this.datos[i-1];
        this.datos[i] = this.truncate(currentQ);
      }else{
        console.log("caso 0");
        for(let ahorro of this.ahorros){
          var fecha = new Date(ahorro.fechaCreacion);
          if(fecha.getMonth() == 0 && fecha.getFullYear() == todaysYear){
            currentQ += ahorro.monto;
          }
        }
        this.datos[i] = this.truncate(currentQ);
      }
    }
    for(var i = 0; i < this.datos.length; i++) {
      this.datosTabla.push({"mes": this.barChartLabels[i], "cant": this.datos[i]})
    }
  }
  private truncate (num): number {
    return Math.trunc(num * Math.pow(10, 2)) / Math.pow(10, 2);
  }

  // events
  public chartClicked(e: any): void {
    //console.log(e);
  }

  public chartHovered(e: any): void {
    //console.log(e);
  }

}
