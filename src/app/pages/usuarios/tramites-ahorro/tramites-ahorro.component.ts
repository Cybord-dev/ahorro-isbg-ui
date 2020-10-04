import { Component, OnInit, ViewChild } from '@angular/core';
import { TabsetComponent } from 'ngx-bootstrap/tabs';
import { Usuario } from '../../../models/usuario';
import { ActivatedRoute } from '@angular/router';
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
  public bsValue = new Date();
  public solicitudes: Solicitud[] = [];
  public solicitud: Solicitud;


  public solicitudAhorro: Solicitud;
  public solicitudModificacion: Solicitud;
  public solicitudRetiro: Solicitud;
  public solicitudCancelacion: Solicitud;


  public noEmpleado = '';
  public oficina = '*';
  public descuentoQuincenal = 100;

  constructor(
    private userService: UsuariosService,
    private solicitudService: SolicitudesService,
  ) { }

  ngOnInit(): void {
    this.errorMessages = [];
    this.success = '';
    this.solicitud = new Solicitud();

    this.userService.myInfo().subscribe((user: Usuario) => {
      this.solicitudService.getSolicitudesByUsuario(user.id).subscribe((solicitudes: Solicitud[]) => {
        this.solicitudes = solicitudes;
        console.log(this.staticTabs);
        this.staticTabs.tabs[0].active = true;
      });
    });
  }


  public sendSolicitud(tipo: string) {

    this.solicitud.idUsuario = this.usuario.id;
    this.solicitud.status = "Solicitud";
    this.solicitud.tipo = tipo;
    this.solicitud.statusDetalle = 'Solicitud inicial';

    this.solicitudService.postSolictudUsuario(this.usuario.id, this.solicitud)
      .subscribe(sol => this.success = 'Se ha enviado la solicitud correctamente');
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
  public bsConfig = { containerClass: 'theme-dark-blue' };


}
