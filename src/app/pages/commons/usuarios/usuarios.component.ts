import { Component, OnInit } from '@angular/core';
import { GenericPage } from '../../../models/generic-page';
import { Router} from '@angular/router';
import { UsuariosService } from '../../../services/usuarios.service';
import { DownloadFileService } from '../../../services/download-file.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'cybord-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {


  public module = 'recursos-humanos';
  public page: GenericPage<any> = new GenericPage();
  public pageSize = '10';
  public loading = false;
  public filterParams: any = {email: '', estatus: '*', nombre: '', tipoUsuario: '*', page: '0', size: '10' };

  constructor(
    public datepipe: DatePipe,
    private userService: UsuariosService,
    private downloadService: DownloadFileService,
    private router: Router) { }

  ngOnInit(): void {
    this.module = this.router.url.split('/')[1];
    if ( this.module === 'recursos-humanos'){
      this.filterParams.tipoUsuario = 'INTERNO';
    }
    if ( this.module === 'contabilidad'){
      this.filterParams.tipoUsuario = 'EXTERNO';
    }
    this.updateDataTable(0, 10);
  }

  public updateDataTable(currentPage?: number, pageSize?: number, filterParams?: any): void{
    this.loading = true;
    this.filterParams.page = currentPage || 0;
    this.filterParams.size = pageSize  || 10;
    this.userService.getUsuarios(this.filterParams).subscribe(data => {this.page = data; this.loading = false;});
  }

  public onChangePageSize(pageSize: number): void {
    this.updateDataTable(this.page.number, pageSize);
  }

  public redirectToUser(id: string): void {
    this.router.navigate([`../${this.module}/usuarios/${id}`]);
  }

  public redirectToAdjustment(id: string): void {
    this.router.navigate([`../contabilidad/ajustes/${id}`]);
  }

  public downloadXLSFile(): void{
    this.loading = true;
    this.filterParams.page = '0';
    this.filterParams.size = '100000';
    this.userService.getUsuariosReport(this.filterParams)
      .subscribe((report) => {
        this.downloadService.downloadFile(report.dato, `ReporteUsuarios-${this.datepipe.transform(Date.now(), 'yyyy-MM-dd')}.xls`, 'application/vnd.ms-excel');
        this.loading = false;
      });
  }

}
