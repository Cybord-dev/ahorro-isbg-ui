import { Component, OnInit, ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common';
import { TabsetComponent } from 'ngx-bootstrap/tabs';
import { Usuario } from '../../../models/usuario';
import { SolicitudesService } from '../../../services/solicitudes.service';
import { UsuariosService } from '../../../services/usuarios.service';
import { Solicitud } from '../../../models/solicitud';
import { ModalDirective } from 'ngx-bootstrap/modal/public_api';

@Component({
  selector: 'cybord-tramites-ahorro',
  templateUrl: './tramites-ahorro.component.html',
  styleUrls: ['./tramites-ahorro.component.scss']
})
export class TramitesAhorroComponent implements OnInit {

  @ViewChild('modalConfirmacion') public modalConfirmacion: ModalDirective;
  @ViewChild('staticTabs', { static: false }) staticTabs: TabsetComponent;


  public loading = false;
  public usuario: Usuario = new Usuario();
  public errorMessages: string[] = [];
  public success = '';
  public tipoSolicitud = 'SolicitudAhorro';
  public alerts: string[] = [];
  private solicitudSat: boolean = false;

  public solicitudAhorro: Solicitud = new Solicitud();
  public solicitudModificacion: Solicitud = new Solicitud();
  public solicitudRetiro: Solicitud = new Solicitud();
  public solicitudCancelacion: Solicitud = new Solicitud();

  public bsValue: Date;

  constructor(
    public datepipe: DatePipe,
    private userService: UsuariosService,
    private solicitudService: SolicitudesService,
  ) { }

  ngOnInit(): void {
    this.errorMessages = [];
    this.success = '';

    this.userService.myInfo().toPromise()
      .then(user => {
        this.solicitudService.getSolicitudesByUsuario(user.id).subscribe((solicitudes: Solicitud[]) => {

          this.solicitudAhorro = solicitudes.find(s => s.tipo === 'SolicitudAhorro') || new Solicitud('SolicitudAhorro');
          this.solicitudCancelacion = solicitudes.find(s => s.tipo === 'CancelacionAhorro') || new Solicitud('CancelacionAhorro');
          this.solicitudRetiro = solicitudes.find(s => s.tipo === 'RetiroParcialAhorro') || new Solicitud('RetiroParcialAhorro');
          this.solicitudModificacion = solicitudes.find(s => s.tipo === 'ModificacionAhorro') || new Solicitud('ModificacionAhorro');
          this.solicitudModificacion.atributos.MONTO = this.solicitudAhorro.atributos.MONTO;
          this.staticTabs.tabs[0].active = true;
        });
        this.userService.getUsuario(user.id).toPromise().then(u => this.usuario = u);
      }).catch((error) => { this.alerts.push(error); this.loading = false; });
  }


  public requestSolicitud(solicitud: Solicitud): void {
    this.loading = true;
    this.alerts = [];
    solicitud.idUsuario = this.usuario.id;
    solicitud.status = 'Solicitud';
    solicitud.statusDetalle = 'Solicitud inicial';
    solicitud.fechaEjecucion = new Date(this.bsValue);
    solicitud.atributos.FECHA = this.datepipe.transform(this.bsValue, 'yyyy-MM-dd');
    this.solicitudService.postSolictudUsuario(this.usuario.id, solicitud).toPromise()
      .then(sol => { this.success = 'Se ha enviado la solicitud correctamente'; this.loading = false; })
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
    console.log(`acepting ${this.tipoSolicitud}`);
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


  public enabledDates = [
    new Date('2020-09-15'),
    new Date('2020-10-01'),
    new Date('2020-10-15'),
    new Date('2020-11-01'),
    new Date('2020-11-15'),
    new Date('2020-12-01'),
    new Date('2020-12-15'),
  ];

}
