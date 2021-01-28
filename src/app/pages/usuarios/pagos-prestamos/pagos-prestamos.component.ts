import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Prestamo } from 'src/app/models/prestamo';
import { SaldoPrestamo } from 'src/app/models/saldoprestamo';
import { Usuario } from 'src/app/models/usuario';
import { UsuariosService } from '../../../services/usuarios.service';
import { PrestamosService } from '../../../services/prestamos.service';
import { Recurso } from 'src/app/models/recurso';
import { RecursoService } from 'src/app/services/recurso.service';
import { ValidationService } from 'src/app/services/validation.service';

@Component({
  selector: 'cybord-pagos-prestamos',
  templateUrl: './pagos-prestamos.component.html',
  styleUrls: ['./pagos-prestamos.component.scss']
})
export class PagosPrestamosComponent implements OnInit {


  @ViewChild('modalConfirmacion') public modalConfirmacion: ModalDirective;

  public usuario: Usuario = new Usuario();
  public prestamos: Prestamo[] = [];
  public total: number = 0;
  public alerts: string[] = [];
  public loading = false;

  public noEmpleado = '';
  public prestamo: Prestamo = new Prestamo();
  public fileName: string = '';
  public fileInput: any;
  public imgPago: Recurso = new Recurso('IMAGEN', 'PRESTAMO');

  public pago: SaldoPrestamo = new SaldoPrestamo();




  constructor(
    private userService: UsuariosService,
    private prestamoService: PrestamosService,
    private validationService: ValidationService,
    private fileService: RecursoService) { }

  ngOnInit(): void {
    this.loadInfo();
  }


  public async loadInfo() {
    this.alerts = [];
    try {
      this.loading = true;
      this.usuario = await this.userService.myInfo();
      let allDebts: Prestamo[] = await this.prestamoService.getPrestamosByUsuario(this.usuario.id).toPromise();
      this.prestamos = allDebts.filter(p => p.estatus.indexOf('TERMINADO') < 0);
      if (this.prestamos !== undefined && this.prestamos.length > 0) {
        this.total = this.prestamos.map(p => p.saldoPendiente).reduce((a, b) => a + b);
      }
      this.loading = false;
    } catch (error) {
      this.alerts.push(error);
      this.loading = false;
    }
  }

  fileUploadListener(event: any): void {
    this.alerts = [];
    this.fileInput = event.target;
    const reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      if (file.size > 1000000) {
        alert('El archivo demasiado grande, intenta con un archivo mas pequeño.');
      } else {
        reader.readAsDataURL(file);
        reader.onload = () => {
          this.fileName = file.name;
          this.imgPago.dato = reader.result.toString();
        };
        reader.onerror = (error) => { this.alerts.push('Error parsing image file'); };
      }
    }
  }

  public async sendPayment() {
    this.pago.idPrestamo = this.prestamo.id;
    this.pago.tipo = 'PAGO';
    this.pago.validado = false;
    this.pago.origen = this.usuario.email;
    try {
      this.alerts = this.validationService.validateSaldoPrestamo(this.pago, this.prestamo);
      if (this.alerts.length == 0) {
        this.pago = await this.prestamoService.insertSaldoPrestamo(this.prestamo.id, this.pago).toPromise();
        this.imgPago.referencia = this.pago.id.toString();
        let img = await this.fileService.insertResourceFile(this.imgPago).toPromise();
        console.log(`${this.fileName} has been laoded`, img);
        this.modalConfirmacion.hide();
        this.noEmpleado = undefined;
        this.loadInfo();
      }
    } catch (error) {
      this.pago = new SaldoPrestamo();
      this.imgPago = new Recurso('IMAGEN', 'PRESTAMO');
      this.fileName = '';
      this.noEmpleado = undefined;
      this.alerts.push(error);
    }
    this.loading = false;
  }

  public openModal(prestamo: Prestamo): void {
    this.alerts = [];
    this.imgPago = new Recurso('IMAGEN', 'PRESTAMO');
    this.fileName = '';
    this.pago = new SaldoPrestamo();
    this.imgPago.dato = undefined;
    this.prestamo = prestamo;
    this.modalConfirmacion.show();
  }

  public closeModal(): void {
    this.pago = new SaldoPrestamo();
    this.imgPago = new Recurso('IMAGEN', 'PRESTAMO');
    this.fileName = '';
    this.noEmpleado = undefined;
    this.prestamo = new Prestamo();

    if (this.fileInput !== undefined) {
      this.fileInput.value = '';
    }
    this.modalConfirmacion.hide();
  }

}
