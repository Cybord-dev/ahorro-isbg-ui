import { Component, OnInit } from '@angular/core';
import { AhorroServicio } from '../../../services/ahorro.service';

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
  public barChartLabels: string[] = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio','agosto'];
  public barChartType = 'bar';
  public barChartLegend = true;

  public barChartData: any[] = [];

  constructor(private saldosAhorro: AhorroServicio) {

  }

  ngOnInit(): void {
    // https://www.chartjs.org/samples/latest/
    console.log('inicio');
    this.saldosAhorro.getSaldoByUsuario(1)
      .subscribe(resultado => {
        console.log('otras cosas');
        console.log(resultado);
      });
    console.log('fin');

    this.barChartData = [{ data: [250, 500, 750, 1000, 1250, 1500, 1750, 2000], label: 'Mi ahorro' }];
  }

  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

}
