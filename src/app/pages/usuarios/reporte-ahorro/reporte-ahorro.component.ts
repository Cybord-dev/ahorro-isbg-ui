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
  private months: string[] = ['noviembre', 'diciembre','enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio','agosto', 'septiembre', 'octubre']
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
    todaysMonth = this.monthChanger(todaysMonth);
    var todaysYear = today.getFullYear();
    for(var i = 0; i <= todaysMonth; i++){
      this.barChartLabels.push(this.months[i]);
      this.datos.push(0);
    }
    //todaysMonth = this.monthChanger(todaysMonth);
    for(var i = 0; i < this.datos.length; i++){
      var currentQ = 0;
      
        for(let ahorro of this.ahorros){
          var fecha = new Date(ahorro.fechaCreacion);
          var mes = this.monthChanger(fecha.getMonth());
          if(i >1){
            if(fecha.getMonth() <= todaysMonth && fecha.getFullYear() == todaysYear){
              if(mes == i)
              {currentQ += ahorro.monto;}
            }
            //Primer y segundo mes
          }else{
            if((mes == 0 || mes == 1) && fecha.getFullYear() == todaysYear-1){
              currentQ += ahorro.monto;
            }
          }
        }
        if(i != 0){
          currentQ += this.datos[i-1];
          this.datos[i] = this.truncate(currentQ);
        }else{
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

  private offsetHelper(mesHoy, mesAhorro): boolean{
    return false;
  }

  private monthChanger(num): number {
    for(let x = 0; x<2; x++){
      num++;
      num = (num > 11) ? 0 : num;
    }
    return num;
  }

  // events
  public chartClicked(e: any): void {
    //console.log(e);
  }

  public chartHovered(e: any): void {
    //console.log(e);
  }

}
