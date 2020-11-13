import { Component, OnInit } from '@angular/core';
import { AhorroServicio } from '../../../services/ahorro.service';
import { SaldoAhorroCaja } from '../../../models/saldoahorrocaja';
import { CarouselConfig } from 'ngx-bootstrap/carousel';
import { Meses } from '../../../models/meses';



@Component({
  selector: 'cybord-resumen',
  templateUrl: 'dashboard.component.html',
  providers: [
    { provide: CarouselConfig, useValue: { interval: false } }
  ]
})
export class DashboardComponent implements OnInit {

  /*** BAR CHART ***/
  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true,
    legend: { labels: { fontColor: 'white' } },
    scales: {
      xAxes: [{ ticks: { fontColor: "#FFF" } }],
      yAxes: [{ ticks: { fontColor: "#FFF" } }]
    }
  };

  public barChartLabels: string[] = ['NOVIEMBRE', 'DICIEMBRE', 'ENERO', 'FEBRERO', 'MARZO', 'ABRIL', 'MAYO', 'JUNIO', 'JULIO', 'AGOSTO', 'SEPTIEMBRE', 'OCTUBRE'];

  public barChartData: any[] = [
    { data: [], label: 'Serie' }
  ];

  /*** PIE CHART ***/
  public doughnutOptions: any = {
    legend: {labels: {fontColor: 'white'}},
    elements: { arc: { borderWidth: 0}}
  };

  public doughnutChartLabels: string[] = ['RETIRO', 'AHORRO', 'DEPOSITO', 'AJUSTE'];
  public doughnutChartData: any = [0, 0, 0, 0];

  public carOptions: any = {
    interval: false,
    keyboard: true,
  };

  public errorMessages: string[] = [];
  public successMessage: string;

  constructor(private saldosAhorro: AhorroServicio) {
    this.barChartDataLoad();

  }

  ngOnInit(): void {
    this.barChartDataLoad();
    this.doughnutChartDataLoad();
  }

  private async doughnutChartDataLoad(): Promise<void> {
    const doughnutData = [];
    try {
      const saldos: SaldoAhorroCaja[] = await this.saldosAhorro.getSaldoCajaAgrupado().toPromise();
      for (const tipo of this.doughnutChartLabels) {
        const data = saldos.find(s => tipo === s.tipo.toUpperCase());
        if (data !== undefined){
          doughnutData.push(data.monto);
        }else{
          doughnutData.push(0);
        }
      }
      this.doughnutChartData = doughnutData;
    } catch (error) {
      this.errorMessages.push(error);
    }
  }

  private async barChartDataLoad(): Promise<void> {
    const barData = [];
    try {
      const saldoAnual = await this.saldosAhorro.getSaldoMesesCaja().toPromise();
      for (const tipo in saldoAnual) {
        if (tipo !== undefined) {
          const data = [];
          const saldos: SaldoAhorroCaja[] = saldoAnual[tipo];
          for (const mes of this.barChartLabels) {
            if (saldos.find(s => s.mes === mes) !== undefined) {
              data.push(saldos.find(s => s.mes === mes).monto);
            } else {
              data.push(0);
            }
          }
          barData.push({ data, label: tipo.toUpperCase() });
        }
      }
      this.barChartData = barData;
    } catch (error) {
      this.errorMessages.push(error);
    }
  }
}
