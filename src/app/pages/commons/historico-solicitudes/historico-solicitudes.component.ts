import { Component, OnInit } from '@angular/core';
import { GenericPage } from '../../../models/generic-page';
import { ValidacionesService } from '../../../services/validaciones.service';
import { Router } from '@angular/router';
import { HistoricoValidacion } from '../../../models/historico-validacion';
import { ɵNoopAnimationDriver } from '@angular/animations/browser';
import { DownloadFileService } from '../../../services/download-file.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'cybord-historico-solicitudes',
  templateUrl: './historico-solicitudes.component.html',
  styleUrls: ['./historico-solicitudes.component.scss']
})
export class HistoricoSolicitudesComponent implements OnInit {

  public module = 'usuarios';
  public page: GenericPage<HistoricoValidacion> = new GenericPage();
  public pageSize = '10';

  public filterParams: any = { idSolicitud:'', nombre: '', noEmpleado: '', tipoUsuario: '*', tipoSolicitud: '*',
  since: '', to: '', fechaEjecucion: '',  estatus: '*', area:'', aprobada:'', page: '0', size: '10' };
  public userEmail: string;
  public loading = false;

  public arrayfechas: Date[] = [];
  public fechaCreacion: Date[];

  constructor(
    private router: Router,
    public datepipe: DatePipe,
    private downloadService: DownloadFileService,
    private validacionService: ValidacionesService) { }

  ngOnInit(): void {
    this.module = this.router.url.split('/')[1];
    this.filterParams.area = this.module;
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

    this.filterParams.page = currentPage.toString() || '0';
    this.filterParams.size = pageSize.toString() || '10';
    this.validacionService.getValidaciones(this.filterParams).subscribe(data => {this.page = data; this.loading = false;});
  }

  public onChangePageSize(pageSize: number): void {
    this.updateDataTable(this.page.number, pageSize);
  }

  public redirectToValidation(id: string): void {
    this.router.navigate([`./${this.module}/historico/${id}`]);
  }

  public downloadXLSFile(): void{
    this.loading = true;
    if(this.fechaCreacion === undefined  || this.fechaCreacion === null){
      this.filterParams.since = '';
      this.filterParams.to = '';
    }else{
      this.fechaCreacion[1].setDate(this.fechaCreacion[1].getDate() + 1);
      this.filterParams.since =  this.datepipe.transform(this.fechaCreacion[0], 'yyyy-MM-dd');
      this.filterParams.to = this.datepipe.transform(this.fechaCreacion[1], 'yyyy-MM-dd');
    }
    this.filterParams.page = '0';
    this.filterParams.size = '100000';
    this.validacionService.getReporteValidaciones(this.filterParams)
      .subscribe((report) => {
        
        this.downloadService.downloadFile(report.dato, `HistoricoValidaciones-${this.datepipe.transform(Date.now(), 'yyyy-MM-dd')}.xls`, 'application/vnd.ms-excel');
        this.loading = false;
      });
  }

}
