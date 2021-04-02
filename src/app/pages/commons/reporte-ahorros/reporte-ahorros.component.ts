import { Component, OnInit } from '@angular/core';
import { GenericPage } from '../../../models/generic-page';
import { Router } from '@angular/router';
import { AhorroServicio } from '../../../services/ahorro.service';
import { DownloadFileService } from '../../../services/download-file.service';
import { DatePipe } from '@angular/common';
import { ReporteAhorro } from '../../../models/reporte-ahorro';

@Component({
  selector: 'cybord-reporte-ahorros',
  templateUrl: './reporte-ahorros.component.html',
  styleUrls: ['./reporte-ahorros.component.scss']
})
export class ReporteAhorrosComponent implements OnInit {

  public module = 'usuarios';
  public page: GenericPage<ReporteAhorro> = new GenericPage();
  public pageSize = '10';
  public filterParams: any = { tipoUsuario: '*',  noEmpleado: '', nombre: '', page: '0', size: '10',  since: '', to: '' };
  public loading = false;
  public fechaCreacion: Date[];
  public minDate = new Date();
  public maxDate = new Date();
  

  constructor(
    private router: Router,
    public datepipe: DatePipe,
    private downloadService: DownloadFileService,
    private ahorroService: AhorroServicio) { }

  ngOnInit(): void {
    this.module = this.router.url.split('/')[1];
    switch (this.module) {
      case 'recursos-humanos':
        this.filterParams.tipoUsuario = 'INTERNO';
        break;
      case 'contabilidad':
        this.filterParams.tipoUsuario = 'EXTERNO';
        break;
      default:
        this.filterParams.tipoUsuario = '*';
        break;
    }
    this.updateDataTable(0, 10);
  }


  public updateDataTable(currentPage?: number, pageSize?: number): void {
    this.loading = true;
    if (this.fechaCreacion === undefined || this.fechaCreacion === null) {
      this.filterParams.since = '';
      this.filterParams.to = '';
    } else {
      this.fechaCreacion[1].setDate(this.fechaCreacion[1].getDate() + 1);
      this.filterParams.since = this.datepipe.transform(this.fechaCreacion[0], 'yyyy-MM-dd');
      this.filterParams.to = this.datepipe.transform(this.fechaCreacion[1], 'yyyy-MM-dd');
    }
    this.filterParams.page = currentPage || 0;
    this.filterParams.size = pageSize || 0 ;
    this.ahorroService.getAhorroUsuarios(this.filterParams)
    .subscribe(data => {this.page = data; this.loading = false;});
  }

  public onChangePageSize(pageSize: number): void {
    this.updateDataTable(this.page.number, pageSize);
  }

  public detalleAhorro(id: string): void{
    this.router.navigate([`../${this.module}/saldo-ahorro/${id}`]);
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
    this.ahorroService.getReporteAhorroUsuarios(this.filterParams)
      .subscribe((report) => {
        this.downloadService.downloadFile(report.dato, `ReporteAhorros-${this.datepipe.transform(Date.now(), 'yyyy-MM-dd')}.xls`, 'application/vnd.ms-excel');
        this.loading = false;
      });
  }

}
