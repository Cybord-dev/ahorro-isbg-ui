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
  public solicitudes: Solicitud[] = [];
  public solicitud: Solicitud;
  public mensajeModal: string = '';

  public alerts: string[] = [];

  private tipoSol: string = '';
  private solicitudSat: boolean = false;

  public solicitudAhorro: Solicitud = new Solicitud();
  public solicitudModificacion: Solicitud = new Solicitud();
  public solicitudRetiro: Solicitud = new Solicitud();
  public solicitudCancelacion: Solicitud = new Solicitud();

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

        this.solicitudAhorro = solicitudes.find(s => s.tipo === 'SolicitudAhorro');





        this.staticTabs.tabs[0].active = true;
      });
      this.userService.getUsuario(user.id).toPromise().then(u => this.usuario = u);
    }).catch((error) => {this.alerts.push(error);this.loading = false;});
  }


  public requestSolicitud(tipo: string): void {
    this.loading = true;
    this.alerts = [];
    this.solicitud.idUsuario = this.usuario.id;
    this.solicitud.status = 'Solicitud';
    this.solicitud.tipo = tipo;
    this.solicitud.statusDetalle = 'Solicitud inicial';
    this.solicitud.fechaEjecucion = new Date(this.bsValue);
    console.log("fecha: 1 "+this.solicitud.fechaEjecucion);
    this.solicitud.atributos.MONTO = this.descuentoQuincenal.toString();
    this.solicitud.atributos.FECHA = this.datepipe.transform(this.bsValue, 'yyyy-MM-dd');
    console.log("fecha: 2 "+this.datepipe.transform(this.bsValue, 'yyyy-MM-dd'));
    this.solicitudService.postSolictudUsuario(this.usuario.id, this.solicitud).toPromise()
      .then(sol => {this.success = 'Se ha enviado la solicitud correctamente'; this.loading = false;})
      .catch((error) => {this.alerts.push(error);this.loading = false;});
  }

  public openModal(tipo:string): void{
    this.tipoSol = tipo;
    this.solicitudSat = true;
    this.modalConfirmacion.show();
  }

  public cancelar(): void{
    this.modalConfirmacion.hide();
  }

  public aceptar(): void{
    this.modalConfirmacion.hide();
    if(this.solicitudSat){
      this.requestSolicitud(this.tipoSol);
    }else{
      console.log('Tipo de solicitud no seteado');
      this.alerts.push('Error en el modal');
    }
    this.solicitudSat = false;
    this.tipoSol = '';
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
