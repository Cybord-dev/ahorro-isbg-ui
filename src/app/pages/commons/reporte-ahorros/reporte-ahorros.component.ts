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
  public filterParams: any = { tipoSolicitud : '', idSolicitud: '', estatus: '', nombre: '', noEmpleado: '', tipoUsuario: '', page: '0', size: '10' };
  public loading = false;


  constructor(
    private router: Router,
    private ahorroService: AhorroServicio) { }

  ngOnInit(): void {
    this.updateDataTable(0, 10, this.filterParams);
  }


  public updateDataTable(currentPage?: number, pageSize?: number, filterParams?: any): void {
    const params: any = this.filterParams;

    params.page = currentPage !== undefined ? currentPage.toString() : this.filterParams.page;
    params.size = pageSize !== undefined ? pageSize.toString() : this.filterParams.size;

    this.ahorroService.getReporteSaldos(params)
    .subscribe(data => this.page = data);
  }

  public onChangePageSize(pageSize: number): void {
    this.updateDataTable(this.page.number, pageSize);
  }

  public redirectToValidation(id: string): void {
    this.router.navigate([`./${this.module}/validacion/${id}`]);
  }

}
