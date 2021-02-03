import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GenericPage } from 'src/app/models/generic-page';
import { SaldoPrestamo } from 'src/app/models/saldoprestamo';
import { DownloadFileService } from 'src/app/services/download-file.service';
import { PrestamosService } from 'src/app/services/prestamos.service';

@Component({
  selector: 'cybord-reporte-prestamos',
  templateUrl: './reporte-prestamos.component.html',
  styleUrls: ['./reporte-prestamos.component.scss']
})
export class ReportePrestamosComponent implements OnInit {

  public module = 'usuarios';
  public page: GenericPage<SaldoPrestamo> = new GenericPage();
  public pageSize = '10';
  public filterParams: any = { tipo: '*',  noEmpleado: '', tipoUsuario: '*', since: '', to: '', page: '0', size: '10' };
  public loading = false;
  public fechaCreacion: Date[];

  constructor(
    private router: Router,
    public datepipe: DatePipe,
    private downloadService: DownloadFileService,
    private prestamoService: PrestamosService) { }

  ngOnInit(): void {
    this.updateDataTable(0, 10);
  }


  public updateDataTable(currentPage?: number, pageSize?: number): void {
    this.loading = true;
    if (this.fechaCreacion === undefined  || this.fechaCreacion === null){
      this.filterParams.since = '';
      this.filterParams.to = '';
    }else{
      this.fechaCreacion[1].setDate(this.fechaCreacion[1].getDate() + 1);
      this.filterParams.since =  this.datepipe.transform(this.fechaCreacion[0], 'yyyy-MM-dd');
      this.filterParams.to = this.datepipe.transform(this.fechaCreacion[1], 'yyyy-MM-dd');
    }

    this.filterParams.page = currentPage || 0;
    this.filterParams.size = pageSize || 0 ;

    this.prestamoService.getSaldos(this.filterParams)
    .subscribe(data => {this.page = data; this.loading = false;});
  }

  public onChangePageSize(pageSize: number): void {
    this.updateDataTable(this.page.number, pageSize);
  }

  public redirectToValidation(id: string): void {
    this.router.navigate([`./${this.module}/validacion/${id}`]);
  }

  public downloadXLSFile(): void{
    this.loading = true;
    if (this.fechaCreacion === undefined  || this.fechaCreacion === null){
      this.filterParams.since = '';
      this.filterParams.to = '';
    }else{
      this.fechaCreacion[1].setDate(this.fechaCreacion[1].getDate() + 1);
      this.filterParams.since =  this.datepipe.transform(this.fechaCreacion[0], 'yyyy-MM-dd');
      this.filterParams.to = this.datepipe.transform(this.fechaCreacion[1], 'yyyy-MM-dd');
    }
    this.filterParams.page = '0';
    this.filterParams.size = '100000';
    /* this.ahorroService.getReporteSaldos(this.filterParams)
      .subscribe((report) => {
        this.downloadService.downloadFile(report.dato, `ReporteAhorros-${this.datepipe.transform(Date.now(), 'yyyy-MM-dd')}.xls`, 'application/vnd.ms-excel');
        this.loading = false;
      });*/
  }
}
