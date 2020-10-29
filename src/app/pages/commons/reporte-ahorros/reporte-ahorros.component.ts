import { Component, OnInit } from '@angular/core';
import { GenericPage } from '../../../models/generic-page';
import { Router } from '@angular/router';
import { AhorroServicio } from '../../../services/ahorro.service';
import { ReporteSaldos } from '../../../models/reportesaldos';

@Component({
  selector: 'cybord-reporte-ahorros',
  templateUrl: './reporte-ahorros.component.html',
  styleUrls: ['./reporte-ahorros.component.scss']
})
export class ReporteAhorrosComponent implements OnInit {

  public module = 'usuarios';
  public page: GenericPage<ReporteSaldos> = new GenericPage();
  public pageSize = '10';
  public filterParams: any = { tipo:'*',  noEmpleado: '', tipoUsuario: '*', since: '', to: '', page: '0', size: '10' };
  public loading = false;
  public fechaCreacion: Date[];

  constructor(
    private router: Router,
    private ahorroService: AhorroServicio) { }

  ngOnInit(): void {
    this.updateDataTable(0, 10);
  }


  public updateDataTable(currentPage?: number, pageSize?: number): void {
    if(this.fechaCreacion === undefined  || this.fechaCreacion === null){
      this.filterParams.since = '';
      this.filterParams.to = '';
    }else{
      this.fechaCreacion[1].setDate(this.fechaCreacion[1].getDate() + 1);
      this.filterParams.since = this.format(this.fechaCreacion[0]);
      this.filterParams.to = this.format(this.fechaCreacion[1]);
    }

    this.filterParams.page = currentPage || 0;
    this.filterParams.size = pageSize || 0 ;

    this.ahorroService.getReporteSaldos(this.filterParams)
    .subscribe(data => this.page = data);
  }

  public onChangePageSize(pageSize: number): void {
    this.updateDataTable(this.page.number, pageSize);
  }

  public redirectToValidation(id: string): void {
    this.router.navigate([`./${this.module}/validacion/${id}`]);
  }


  private format(fecha: Date): string{
  
    var d = new Date(fecha),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;
    return [year, month, day].join('-');
  }
}
