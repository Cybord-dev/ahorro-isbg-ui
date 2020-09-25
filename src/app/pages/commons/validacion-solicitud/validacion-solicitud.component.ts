import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Solicitud } from 'src/app/models/solicitud';
import { Usuario } from 'src/app/models/usuario';
import { SolicitudesService } from 'src/app/services/solicitudes.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'cybord-validacion-solicitud',
  templateUrl: './validacion-solicitud.component.html',
  styleUrls: ['./validacion-solicitud.component.scss']
})
export class ValidacionSolicitudComponent implements OnInit {


  public usuario: Usuario = new Usuario();
  public errorMessages: string[] = [];
  public success = '';
  public bsValue = new Date();

  constructor(
    private userService: UsuariosService,
    private solicitudService: SolicitudesService,
    private route: ActivatedRoute,
  ) { }

  public solicitud: Solicitud;

  public noEmpleado: number;
  public oficina: number;
  public descuentoQuincenal: number;

  public requestSolicitud(tipo: string) {

    this.solicitud.idUsuario = this.usuario.id;
    this.solicitud.status = "Solicitud";
    this.solicitud.tipo = tipo;
    this.solicitud.statusDetalle = 'Solicitud inicial';

    this.solicitudService.postSolictudUsuario(this.usuario.id, this.solicitud)
      .subscribe(sol => this.success = 'Se ha enviado la solicitud correctamente');
  }

  ngOnInit(): void {
    this.solicitud = new Solicitud();
    this.route.paramMap.subscribe(route => {
      const id = route.get('idUsuario');
      console.log("id " + id)
      this.userService.getUsuario(+id).subscribe((user: Usuario) => {
        this.usuario = user;

        this.noEmpleado = Math.floor(Math.random() * 60) + 1;
        this.oficina = Math.floor(Math.random() * 2) + 1;
        this.descuentoQuincenal = Math.floor(Math.random() * 60) + 1;
      });


    });


  }

}
