import { Component, OnInit, ViewChild } from '@angular/core';
import { GenericPage } from '../../../models/generic-page';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { DownloadFileService } from '../../../services/download-file.service';
import { PrestamosService } from '../../../services/prestamos.service';
import { SaldoPrestamo } from '../../../models/saldoprestamo';
import { ModalDirective } from 'ngx-bootstrap/modal/public_api';
import { Usuario } from '../../../models/usuario';
import { SafeUrl, DomSanitizer } from '@angular/platform-browser';
import { RecursoService } from '../../../services/recurso.service';
import { UsuariosService } from '../../../services/usuarios.service';

@Component({
  selector: 'cybord-conciliacion-prestamos',
  templateUrl: './conciliacion-prestamos.component.html',
  styleUrls: ['./conciliacion-prestamos.component.scss']
})
export class ConciliacionPrestamosComponent implements OnInit {

  @ViewChild('modalConfirmacion') public modalConfirmacion: ModalDirective;

  public module = 'usuarios';
  public page: GenericPage<SaldoPrestamo> = new GenericPage();
  public pageSize = '10';
  public filterParams: any = {tipoUsuario:'*',nombre:'', idSolicitud: '', estatus: "*",validado:'EN_VALIDACION',tipo:'*', noEmpleado: '', since: '', to: '', page: '0', size: '10' };
  public loading = false;
  public fechaCreacion: Date[];
  public minDate = new Date();
  public maxDate = new Date();

  public usuario: Usuario = new Usuario();
  public noEmpleado: string;
  public saldo: SaldoPrestamo = new SaldoPrestamo();
  public comprobanteUrl: SafeUrl;
  public pagos : SaldoPrestamo[] = [];
  public message = '';

  constructor(
    private router: Router,
    public datepipe: DatePipe,
    private downloadService: DownloadFileService,
    private prestamosService: PrestamosService,
    private resourcesService: RecursoService,
    private sanitizer: DomSanitizer,
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
    this.filterParams.size = pageSize || 0 ;
    this.prestamosService.getSaldoPrestamos(this.filterParams)
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
    this.prestamosService.getReporteSaldoPrestamos(this.filterParams)
      .subscribe((report) => {
        this.downloadService.downloadFile(report.dato, `ReportePagosPrestamos-${this.datepipe.transform(Date.now(), 'yyyy-MM-dd')}.xls`, 'application/vnd.ms-excel');
        this.loading = false;
      });
  }

  public mostrarComprobante(prestamo: SaldoPrestamo) {
    this.prestamosService.getSaldosByIdPrestamoAndNoPago(prestamo.idPrestamo,prestamo.noPago)
    .subscribe(saldos => this.pagos = saldos);
    this.comprobanteUrl = undefined;
    if (prestamo.origen !== 'SISTEMA') {
      this.resourcesService.getRecurso(prestamo.id, 'PRESTAMO', 'IMAGEN').subscribe(
        (file) => {
          this.comprobanteUrl = this.sanitizer.bypassSecurityTrustUrl(file.dato);
        });
    }
  }

  public openModal(prestamo: SaldoPrestamo): void {
    this.saldo = prestamo;
    this.message = '';
    this.modalConfirmacion.show();
    this.mostrarComprobante(prestamo);
  }

  public salir(): void {
    this.message = '';
    this.pagos = [];
    this.saldo = new SaldoPrestamo();
    this.modalConfirmacion.hide();
  }

  public async aprobarPago(): Promise<void> {
    try {
      this.loading = true;
      let s = { ...this.saldo };
      s.validado = 'EN_VALIDACION';
      s.origen = this.usuario.email;
      await this.prestamosService.aprobarPagoPrestamo(this.saldo.idPrestamo, this.saldo.noPago, this.usuario.email).toPromise();
      this.message = 'Pago aprobado correctamente';
      this.saldo = new SaldoPrestamo();
      this.modalConfirmacion.hide();
      this.updateDataTable(this.page.number, this.page.size);
    } catch (error) {
      this.loading = false;
      this.message = error;
    }
  }
  
  public async downloadImage() {
    let resource = await this.resourcesService.getRecurso(this.saldo.id, 'PRESTAMO', 'IMAGEN').toPromise();
    let dataType = resource.dato.split(';base64,')[0].replace('data:',''); 
    console.log('Downloading file : ', dataType);
    this.downloadService.downloadFile(resource.dato.split(';base64,')[1],`${this.saldo.noEmpleado}-${this.saldo.montoPrestamo}-${this.saldo.noPago}.${dataType.split('/')[1]}`,dataType);   
  }
}
