import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { GenericPage } from 'src/app/models/generic-page';
import { ReportePrestamo } from 'src/app/models/reporte-prestamo';
import { SaldoPrestamo } from 'src/app/models/saldoprestamo';
import { Usuario } from 'src/app/models/usuario';
import { DownloadFileService } from 'src/app/services/download-file.service';
import { PrestamosService } from 'src/app/services/prestamos.service';
import { RecursoService } from 'src/app/services/recurso.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { CatalogosService } from '../../../services/catalogos.service';

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
  public filterParams: any = {tipoUsuario:'*',nombre:'', idSolicitud: '', tipo: "*", noEmpleado: '', since: '', to: '', page: '0', size: '10' };
  public loading = false;
  public fechaCreacion: Date[];
  public fechaActualizacion: Date[];
  public usuario: Usuario = new Usuario();
  public noEmpleado: string;
  public saldo: SaldoPrestamo = new SaldoPrestamo();
  public comprobanteUrl: SafeUrl;
  public message: string = '';

  public maxDate = new Date();

  constructor(
    private router: Router,
    public datepipe: DatePipe,
    private downloadService: DownloadFileService,
    private resourcesService: RecursoService,
    private prestamoService: PrestamosService,
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


  public mostrarComprobante(prestamo: SaldoPrestamo) {
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
    this.saldo = new SaldoPrestamo();
    this.modalConfirmacion.hide();
  }

  public async aprobarPago(): Promise<void> {
    try {
      this.loading = true;
      let s = { ...this.saldo };
      s.validado = true;
      s.origen = this.usuario.email;
      this.saldo = await this.prestamoService.updateSaldoPrestamo(this.saldo.id, s).toPromise();
      this.message = 'Pago aprobado correctamente';
      this.saldo = new SaldoPrestamo();
      this.modalConfirmacion.hide();
      this.updateDataTable(this.page.number, this.page.size);
    } catch (error) {
      this.loading = false;
      this.message = error;
    }
  }

  //TODO talvez mover a servicio de descarga de imagenes
  public async downloadImage() {
    let resource = await this.resourcesService.getRecurso(this.saldo.id, 'PRESTAMO', 'IMAGEN').toPromise();
    const blobData = this.convertBase64ToBlobData(resource.dato.replace(/^data:image\/(png|jpeg|jpg);base64,/, ''));
    let filename = `comprobantePago.jpeg`;
    let contentType = 'image/jpeg';
    if (window.navigator && window.navigator.msSaveOrOpenBlob) {
      window.navigator.msSaveOrOpenBlob(blobData, filename);
    } else {
      const blob = new Blob([blobData], { type: contentType });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      link.click();
    }
  }

  public convertBase64ToBlobData(base64Data: string, contentType: string = 'image/png', sliceSize = 512) {
    const byteCharacters = atob(base64Data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);

      byteArrays.push(byteArray);
    }

    const blob = new Blob(byteArrays, { type: contentType });
    return blob;
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
