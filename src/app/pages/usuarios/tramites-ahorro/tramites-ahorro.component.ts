import { Component, OnInit, ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common';
import { TabsetComponent } from 'ngx-bootstrap/tabs';
import { Usuario } from '../../../models/usuario';
import { SolicitudesService } from '../../../services/solicitudes.service';
import { UsuariosService } from '../../../services/usuarios.service';
import { Solicitud } from '../../../models/solicitud';
import { ModalDirective } from 'ngx-bootstrap/modal/public_api';
import { AhorroServicio } from 'src/app/services/ahorro.service';

@Component({
  selector: 'cybord-tramites-ahorro',
  templateUrl: './tramites-ahorro.component.html',
  styleUrls: ['./tramites-ahorro.component.scss']
})
export class TramitesAhorroComponent implements OnInit {

  @ViewChild('modalConfirmacion') public modalConfirmacion: ModalDirective;

  public loading = false;
  public usuario: Usuario = new Usuario();
  public errorMessages: string[] = [];
  public success = '';
  public tipoSolicitud = 'SolicitudAhorro';
  public alerts: string[] = [];

  public enabledDates = [];

  public solicitudAhorro: Solicitud = new Solicitud();
  public solicitudModificacion: Solicitud = new Solicitud();
  public solicitudRetiro: Solicitud = new Solicitud();
  public solicitudCancelacion: Solicitud = new Solicitud();
  public bloqueo: boolean = false;
  public bsValue: Date;

  constructor(
    public datepipe: DatePipe,
    private userService: UsuariosService,
    private solicitudService: SolicitudesService,
    private ahorroService: AhorroServicio,
  ) { }

  ngOnInit(): void {
    this.errorMessages = [];
    this.success = '';

    this.calculateEnabledDates();
    this.userService.myInfo().toPromise()
      .then(user => {
        this.solicitudService.getSolicitudesByUsuario(user.id).subscribe((solicitudes: Solicitud[]) => {
          
          solicitudes.forEach(element => {
            if(element.tipo === "SolicitudAhorro" && element.status !== "Rechazada"){
              this.bloqueo = true;
            }
          });
          
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

        });
        this.userService.getUsuario(user.id).toPromise().then(u => this.usuario = u);
      }).catch((error) => { this.alerts.push(error); this.loading = false; });
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
        if(!this.bloqueo){
          this.requestSolicitud(this.solicitudAhorro);
        }else{
          this.alerts.push("Ya tienes una solicitud en progreso o finalizada");
        }
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
    if(currentDate.getDate() < 15){
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
  }

}
