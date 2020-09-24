import { Component, OnInit } from '@angular/core';

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

  public barChartData: any[] = [
    { data: [250, 500, 750, 1000, 1250, 1500, 1750, 2000], label: 'Mi ahorro' }
  ];

  constructor() {

  }

  ngOnInit(): void {

  }

  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

}
