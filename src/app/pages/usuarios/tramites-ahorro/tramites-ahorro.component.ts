import { Component, OnInit, ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common';
import { TabsetComponent } from 'ngx-bootstrap/tabs';
import { Usuario } from '../../../models/usuario';
import { SolicitudesService } from '../../../services/solicitudes.service';
import { UsuariosService } from '../../../services/usuarios.service';
import { Solicitud } from '../../../models/solicitud';

@Component({
  selector: 'cybord-tramites-ahorro',
  templateUrl: './tramites-ahorro.component.html',
  styleUrls: ['./tramites-ahorro.component.scss']
})
export class TramitesAhorroComponent implements OnInit {


  @ViewChild('staticTabs', { static: false }) staticTabs: TabsetComponent;


  public loading = true;
  public usuario: Usuario = new Usuario();
  public errorMessages: string[] = [];
  public success = '';
  public solicitudes: Solicitud[] = [];
  public solicitud: Solicitud;

  public alerts: string[] = [];


  public solicitudAhorro: Solicitud;
  public solicitudModificacion: Solicitud;
  public solicitudRetiro: Solicitud;
  public solicitudCancelacion: Solicitud;

  public descuentoQuincenal = 100;
  public bsValue: Date;

  constructor(
    public datepipe: DatePipe,
    private userService: UsuariosService,
    private solicitudService: SolicitudesService,
  ) { }

  ngOnInit(): void {
    this.errorMessages = [];
    this.success = '';
    this.solicitud = new Solicitud();

    this.userService.myInfo().toPromise()
    .then(user => {
      this.solicitudService.getSolicitudesByUsuario(user.id).subscribe((solicitudes: Solicitud[]) => {
        this.solicitudes = solicitudes;
        this.staticTabs.tabs[0].active = true;
      });
      this.userService.getUsuario(user.id).toPromise().then(u => this.usuario = u);
    }).catch((error) => this.alerts.push(error));
  }


  public sendSolicitud(tipo: string): void {
    this.alerts = [];
    this.solicitud.idUsuario = this.usuario.id;
    this.solicitud.status = 'Solicitud';
    this.solicitud.tipo = tipo;
    this.solicitud.statusDetalle = 'Solicitud inicial';
    this.solicitud.fechaEjecucion = this.bsValue;
    this.solicitud.atributos.MONTO = this.descuentoQuincenal.toString();
    this.solicitud.atributos.FECHA = this.datepipe.transform(this.bsValue, 'yyyy-MM-dd');

    this.solicitudService.postSolictudUsuario(this.usuario.id, this.solicitud).toPromise()
      .then(sol => this.success = 'Se ha enviado la solicitud correctamente')
      .catch((error) => this.alerts.push(error));
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
