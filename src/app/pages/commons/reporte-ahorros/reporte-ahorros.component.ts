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


  constructor(
    private router: Router,
    private ahorroService: AhorroServicio) { }

  ngOnInit(): void {
    this.updateDataTable(0, 10);
  }


  public updateDataTable(currentPage?: number, pageSize?: number): void {


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

}
