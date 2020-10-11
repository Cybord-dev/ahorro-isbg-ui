import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuariosService } from '../../../services/usuarios.service';
import { SolicitudesService } from '../../../services/solicitudes.service';
import { Solicitud } from '../../../models/solicitud';
import { Usuario } from '../../../models/usuario';
import { ValidacionesService } from '../../../services/validaciones.service';
import { Validacion } from '../../../models/validacion';


@Component({
  selector: 'cybord-validacion-solicitud',
  templateUrl: './validacion-solicitud.component.html',
  styleUrls: ['./validacion-solicitud.component.scss']
})
export class ValidacionSolicitudComponent implements OnInit {

  public validador: Usuario = new Usuario();

  public solicitud: Solicitud = new Solicitud();
  public usuario: Usuario = new Usuario();

  public module = '';
  public alerts: string[] = [];
  public success = '';

  public validated = false;

  constructor(
    private userService: UsuariosService,
    private solicitudService: SolicitudesService,
    private validacionService: ValidacionesService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }


  ngOnInit(): void {

    this.module = this.router.url.split('/')[1];

    this.userService.myInfo().toPromise()
    .then(user => this.validador = user)
    .catch(error => this.alerts.push(error));

    this.solicitud = new Solicitud();
    this.route.paramMap.subscribe(route => {
      const id = route.get('idSolicitud');
      this.solicitudService.getSolicitudesById(+id).toPromise()
        .then((solicitud: Solicitud) => {
          this.solicitud = solicitud;
          this.userService.getUsuario(solicitud.idUsuario).toPromise()
            .then(user => this.usuario = user);
        }).catch(error => this.alerts.push(error));
    });
  }

  aprobarSolicitud(): void{
    const validacion = new Validacion(this.solicitud.idUsuario, this.solicitud.id, this.module,this.validador.email, true);
    this.validacionService.postValidacion(this.solicitud.idUsuario, this.solicitud.id, validacion)
      .toPromise().then((result) => {this.success = 'Solicitud validada correctamente.'; this.validated = true;})
      .catch(error => this.alerts.push(error));
  }

  rechazarSolicitud(): void{
    const validacion = new Validacion(this.solicitud.idUsuario, this.solicitud.id, this.module,this.validador.email, false);
    this.validacionService.postValidacion(this.solicitud.idUsuario, this.solicitud.id, validacion)
      .toPromise().then((result) => {this.success = 'Solicitud rechazada correctamente.'; this.validated = true;})
      .catch(error => this.alerts.push(error));
  }

}
