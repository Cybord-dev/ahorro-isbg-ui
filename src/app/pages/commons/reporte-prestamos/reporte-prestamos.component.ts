import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { GenericPage } from '../../../models/generic-page';
import { ReportePrestamo } from '../../../models/reporte-prestamo';
import { SaldoPrestamo } from '../../../models/saldoprestamo';
import { Usuario } from '../../../models/usuario';
import { DownloadFileService } from '../../../services/download-file.service';
import { PrestamosService } from '../../../services/prestamos.service';
import { UsuariosService } from '../../../services/usuarios.service';

@Component({
  selector: 'cybord-reporte-prestamos',
  templateUrl: './reporte-prestamos.component.html',
  styleUrls: ['./reporte-prestamos.component.scss']
})
export class ReportePrestamosComponent implements OnInit {

  @ViewChild('modalConfirmacion') public modalConfirmacion: ModalDirective;
  public module = 'usuarios';
  public page: GenericPage<ReportePrestamo> = new GenericPage();
  public pageSize = '10';
  public filterParams: any = {tipoUsuario:'*',nombre:'', idSolicitud: '', estatus: "*", noEmpleado: '', since: '', to: '', page: '0', size: '10' };
  public loading = false;
  public fechaCreacion: Date[];
  public fechaActualizacion: Date[];
  public usuario: Usuario = new Usuario();
  public noEmpleado: string;
  public saldo: SaldoPrestamo = new SaldoPrestamo();
  public message = '';

  public maxDate = new Date();

  constructor(
    private router: Router,
    public datepipe: DatePipe,
    private downloadService: DownloadFileService,
    private prestamoService: PrestamosService,
    private userService: UsuariosService) { }

  ngOnInit(): void {
    this.userService.myInfo().then(user => this.usuario = user);
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
    this.filterParams.size = pageSize || 0;

    this.prestamoService.getPrestamos(this.filterParams)
      .subscribe(data => { this.page = data; this.loading = false; });
  }

  public onChangePageSize(pageSize: number): void {
    this.updateDataTable(this.page.number, pageSize);
  }

  public detallePrestamos(id: number){
    this.router.navigate([`../${this.module}/prestamos-activos/${id}`]);
  }

  public downloadXLSFile(): void {
    this.loading = true;
    if (this.fechaCreacion === undefined || this.fechaCreacion === null) {
      this.filterParams.since = '';
      this.filterParams.to = '';
    } else {
      this.fechaCreacion[1].setDate(this.fechaCreacion[1].getDate() + 1);
      this.filterParams.since = this.datepipe.transform(this.fechaCreacion[0], 'yyyy-MM-dd');
      this.filterParams.to = this.datepipe.transform(this.fechaCreacion[1], 'yyyy-MM-dd');
    }
    this.filterParams.page = '0';
    this.filterParams.size = '100000';
    this.prestamoService.getReportePrestamos(this.filterParams)
      .subscribe((report) => {
        this.downloadService.downloadFile(report.dato, `ReporteSaldoPrestamos-${this.datepipe.transform(Date.now(), 'yyyy-MM-dd')}.xls`, 'application/vnd.ms-excel');
        this.loading = false;
      });
  }
}
