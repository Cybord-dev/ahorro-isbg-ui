import { Component, OnInit, ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Usuario } from '../../../models/usuario';
import { SolicitudesService } from '../../../services/solicitudes.service';
import { AhorroServicio } from '../../../services/ahorro.service';
import { UsuariosService } from '../../../services/usuarios.service';
import { Solicitud } from '../../../models/solicitud';
import { ModalDirective } from 'ngx-bootstrap/modal/public_api';
import { CatalogosService } from 'src/app/services/catalogos.service';
import { Catalogo } from 'src/app/models/catalogo';


@Component({
  selector: 'cybord-tramites-ahorro',
  templateUrl: './tramites-ahorro.component.html',
  styleUrls: ['./tramites-ahorro.component.scss']
})
export class TramitesAhorroComponent implements OnInit {

  @ViewChild('modalConfirmacion') public modalConfirmacion: ModalDirective;

  public oficinas: Catalogo[] = [];
  public loading = false;
  public usuario: Usuario = new Usuario();
  public noEmpleado: '';
  public errorMessages: string[] = [];
  public success = '';
  public tipoSolicitud = 'SolicitudAhorro';
  public alerts: string[] = [];
  public enabledDates = [];

  public solicitudAhorro: Solicitud = new Solicitud();
  public solicitudModificacion: Solicitud = new Solicitud();
  public solicitudRetiro: Solicitud = new Solicitud();
  public solicitudCancelacion: Solicitud = new Solicitud();

  public bsValue: Date;
  public solicitudEnProgreso = '';

  constructor(
    public datepipe: DatePipe,
    private userService: UsuariosService,
    private solicitudService: SolicitudesService,
    private catService: CatalogosService,
    private ahorroService: AhorroServicio,
  ) { }

  ngOnInit(): void {
    this.errorMessages = [];
    this.success = '';
    this.loading = true;
    this.calculateEnabledDates();
    this.loadRequestInfo();
  }

  public async loadRequestInfo(): Promise<void> {
    try {
      const user = await this.userService.myInfo().toPromise();
      this.usuario = await this.userService.getUsuario(user.id).toPromise();

      const oficina: Catalogo = await this.catService.getCatalogoByTipoAndNombre('oficinas', this.usuario.datosUsuario.OFICINA)
        .toPromise();
      this.usuario.datosUsuario.OFICINA = oficina.valor;

      const solicitudes = await this.solicitudService.getSolicitudesByUsuario(user.id).toPromise();

      this.solicitudAhorro = solicitudes.sort((a, b) => new Date(b.fechaCreacion).getTime() - new Date(a.fechaCreacion).getTime())
        .find(s => s.tipo === 'SolicitudAhorro') || new Solicitud('SolicitudAhorro');
      this.solicitudCancelacion = solicitudes.sort((a, b) => new Date(b.fechaCreacion).getTime() - new Date(a.fechaCreacion).getTime())
        .find(s => s.tipo === 'CancelacionAhorro') || new Solicitud('CancelacionAhorro');
      this.solicitudRetiro = solicitudes.sort((a, b) => new Date(b.fechaCreacion).getTime() - new Date(a.fechaCreacion).getTime())
        .find(s => s.tipo === 'RetiroParcialAhorro') || new Solicitud('RetiroParcialAhorro');
      this.solicitudModificacion = solicitudes.sort((a, b) => new Date(b.fechaCreacion).getTime() - new Date(a.fechaCreacion).getTime())
        .find(s => s.tipo === 'ModificacionAhorro') || new Solicitud('ModificacionAhorro');
      this.solicitudModificacion.atributos.MONTO = this.solicitudAhorro.atributos.MONTO;
      this.solicitudCancelacion.atributos.MONTO = this.solicitudAhorro.atributos.MONTO;
      if (this.solicitudCancelacion.status !== undefined && this.solicitudCancelacion.status !== 'Rechazada'
        && this.solicitudCancelacion.status !== 'Finalizada') {
        this.solicitudEnProgreso = 'La solicitud de cancelación se encuentra en progreso';
      }
      if (this.solicitudRetiro.status !== undefined && this.solicitudRetiro.status !== 'Rechazada'
        && this.solicitudRetiro.status !== 'Finalizada') {
        this.solicitudEnProgreso = 'La solicitud de retiro se encuentra en progreso';
      }

      if (this.solicitudModificacion.status !== undefined && this.solicitudModificacion.status !== 'Rechazada'
        && this.solicitudModificacion.status !== 'Finalizada') {
        this.solicitudEnProgreso = 'La modificacón de ahorro se encuentra en progreso';
      }
      this.loading = false;
    } catch (error) {
      this.alerts.push(error);
      this.loading = false;
    }
  }


  public requestSolicitud(solicitud: Solicitud): void {
    this.loading = true;
    this.alerts = [];
    solicitud.id = undefined;
    solicitud.idUsuario = this.usuario.id;
    solicitud.status = 'Solicitud';
    solicitud.statusDetalle = 'Solicitud inicial';
    solicitud.fechaEjecucion = new Date(this.bsValue);
    solicitud.atributos.FECHA = this.datepipe.transform(this.bsValue, 'yyyy-MM-dd');
    this.solicitudService.postSolictudUsuario(this.usuario.id, solicitud).toPromise()
      .then(sol => { this.loading = false; this.solicitudEnProgreso = 'La solicitud se encuentra en progreso'; this.success = 'La solicitud se envio correctamente'; })
      .catch((error) => { this.alerts.push(error); this.loading = false; });
  }

  public openModal(tipo: string): void {
    this.tipoSolicitud = tipo;
    console.log(`requesting ${tipo}`);
    this.modalConfirmacion.show();
  }

  public cancelar(): void {
    this.modalConfirmacion.hide();
  }

  public aceptar(): void {
    switch (this.tipoSolicitud) {
      case 'SolicitudAhorro':
        this.requestSolicitud(this.solicitudAhorro);
        break;
      case 'CancelacionAhorro':
        this.requestSolicitud(this.solicitudCancelacion);
        break;
      case 'RetiroParcialAhorro':
        this.requestSolicitud(this.solicitudRetiro);
        break;
      case 'ModificacionAhorro':
        this.requestSolicitud(this.solicitudModificacion);
        break;
      default:
        this.errorMessages.push('Error identificando el tipo de solicitud');
        break;
    }
    this.modalConfirmacion.hide();
  }


  public calculateEnabledDates(): void {
    const currentDate = new Date();
    if (currentDate.getDate() < 15) {
      currentDate.setDate(15);
      currentDate.setMonth(currentDate.getMonth());
      this.enabledDates.push(currentDate);
    }
    for (let i = 1; i < 5; i++) {
      const date1 = new Date();
      date1.setDate(1);
      date1.setMonth(date1.getMonth() + i);
      this.enabledDates.push(date1);

      const date2 = new Date();
      date2.setDate(15);
      date2.setMonth(date2.getMonth() + i);
      this.enabledDates.push(date2);
    }
    this.bsValue = this.enabledDates[0];
  }

}
