import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal/public_api';
import { GenericPage } from '../../../models/generic-page';
import { AvalService } from '../../../services/aval.service';
import { SolicitudesService } from '../../../services/solicitudes.service';
import { UsuariosService } from '../../../services/usuarios.service';
import { AceptacionAval } from '../../../models/aceptacion-aval';
import { Atributos } from '../../../models/atributos';
import { Usuario } from 'src/app/models/usuario';
import { Solicitud } from 'src/app/models/solicitud';

@Component({
  selector: 'cybord-aprobacion-aval',
  templateUrl: './aprobacion-aval.component.html',
  styleUrls: ['./aprobacion-aval.component.scss']
})
export class AprobacionAvalComponent implements OnInit {

  @ViewChild('modalConfirmacion') public modalConfirmacion: ModalDirective;

  public errorMessages: string[] = [];
  public alerts: string[] = [];
  public mensajeModal = '';
  public params: any = { success: '', message: '', id: '*', module: 'usuarios' };
  public avales: AceptacionAval[] = [];
  public loading = false;
  public mostrando = false;
  public prestamo: Solicitud;
  public confirmacion: string = "";
  public seleccion: AceptacionAval = null;
  public informacion: any = {
    noEmpleado: "", monto: "", nombreDeudor: "", status: "", inicio: "", noQuincenas: "", descuento: ""
  }
  public noEmpleado: string = "";

  public usuario: Usuario = new Usuario();

  constructor(
    private avalService: AvalService,
    private solicitudService: SolicitudesService,
    private userService: UsuariosService
  ) { }

  ngOnInit(): void {
    this.loading = true;
    this.userService.myInfo()
      .then(user => {
        this.noEmpleado = user.noEmpleado
        this.avalService.getAceptacionesPendientesPorNoEmpleado(this.noEmpleado).toPromise()
          .then(data => {
            this.avales = data; this.loading = false;
          })
          .catch(error => { this.errorMessages.push(error); this.loading = false; });
      })
      .catch(error => { this.errorMessages.push(error); this.loading = false; });
  }


  public async mostrarInformacion(aval: AceptacionAval): Promise<void> {
    this.loading = true;
    //noEmpleado: "", monto: "", nombreDeudor: "", status: "", inicio: "", noQuincenas: "", descuento: ""
    try {
      this.prestamo = await this.solicitudService.getSolicitudesById(aval.idSolicitud).toPromise();
      this.informacion.noEmpleado = aval.noEmpleadoDeudor;
      this.informacion.monto = aval.montoPrestamo;
      this.informacion.nombreDeudor = aval.nombreDeudor;
      this.informacion.inicio = this.prestamo.atributos.FECHA;
      this.informacion.noQuincenas = this.prestamo.atributos.NO_QUINCENAS;
      this.informacion.descuento = this.prestamo.atributos.DESCUENTO_QUINCENAL;
      this.seleccion = aval;
    } catch (error) {
      this.errorMessages.push(error);
      this.loading = false;
    }
    this.loading = false;
    this.openModal();
  }

  public fecha(dato: string): string {
    var temp = new Date(dato);
    var tokens = temp.toString().split(" ");
    return tokens[2] + "/" + (temp.getMonth() + 1) + "/" + temp.getFullYear();
  }

  public openModal(): void {
    this.modalConfirmacion.show();
  }

  public cerrar(): void {
    this.seleccion = null;
    this.confirmacion = "";
    this.modalConfirmacion.hide();
  }
  //RECHAZO,APROBADO;
  public aceptar(): void {
    this.loading = true;
    this.seleccion.estatus = "APROBADO"
    this.avalService.putAval(this.seleccion.id, this.seleccion).toPromise()
      .then(data => {
        this.avalService.getAceptacionesPendientesPorNoEmpleado(this.noEmpleado).toPromise()
          .then(data => {
            this.avales = data; this.loading = false;
          })
      })
      .catch(error => { this.errorMessages.push(error); this.loading = false; });
    this.cerrar();
  }

  public rechazar(): void {
    this.loading = true;
    this.seleccion.estatus = "RECHAZO"
    this.avalService.putAval(this.seleccion.id, this.seleccion).toPromise()
      .then(data => {
        this.avalService.getAceptacionesPendientesPorNoEmpleado(this.noEmpleado).toPromise()
          .then(data => {
            this.avales = data; this.loading = false;
          })
      })
      .catch(error => { this.errorMessages.push(error); this.loading = false; });
    this.cerrar();
  }

}
