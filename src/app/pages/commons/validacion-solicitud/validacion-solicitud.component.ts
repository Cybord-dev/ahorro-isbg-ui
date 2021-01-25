import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuariosService } from '../../../services/usuarios.service';
import { SolicitudesService } from '../../../services/solicitudes.service';
import { Solicitud } from '../../../models/solicitud';
import { Usuario } from '../../../models/usuario';
import { ValidacionesService } from '../../../services/validaciones.service';
import { Validacion } from '../../../models/validacion';
import { ModalDirective } from 'ngx-bootstrap/modal/public_api';
import { CatalogosService } from '../../..//services/catalogos.service';
import { Catalogo } from '../../../models/catalogo';
import { AvalService } from 'src/app/services/aval.service';
import { Aval } from 'src/app/models/aval';
import { CapacidadPago } from 'src/app/models/capacidad-pago';


@Component({
  selector: 'cybord-validacion-solicitud',
  templateUrl: './validacion-solicitud.component.html',
  styleUrls: ['./validacion-solicitud.component.scss']
})


export class ValidacionSolicitudComponent implements OnInit {

  @ViewChild('modalConfirmacion') public modalConfirmacion: ModalDirective;

  public module = 'usuarios';
  public submodule: string;

  public validador: Usuario = new Usuario();
  public aprobacion = false;
  public razonRechazo = '';
  public solicitud: Solicitud = new Solicitud();
  public usuario: Usuario = new Usuario();
  public aceptacionAvales: Aval[] = [];
  public loading = false;
  public alerts: string[] = [];
  public success = '';
  public validated = false;
  public noEmpleado = '';

  constructor(
    private userService: UsuariosService,
    private solicitudService: SolicitudesService,
    private validacionService: ValidacionesService,
    private avalService: AvalService,
    private route: ActivatedRoute,
    private catService: CatalogosService,
    private router: Router,
  ) { }


  ngOnInit(): void {
    this.loading = true;
    this.module = this.router.url.split('/')[1];
    this.submodule = this.router.url.split('/')[2];

    this.userService.myInfo()
      .then(user => this.validador = user)
      .catch(error => this.alerts.push(error));

    this.solicitud = new Solicitud();
    this.route.paramMap.subscribe(route => {
      const id = route.get('idSolicitud');
      this.loadSolicitudInfo(+id);
    });
  }

  public async loadSolicitudInfo(id: number): Promise<void> {
    try {
      this.solicitud = await this.solicitudService.getSolicitudesById(id).toPromise();
      this.usuario = await this.userService.getUsuario(this.solicitud.idUsuario).toPromise();
      const oficina: Catalogo = await this.catService.getCatalogoByTipoAndNombre('oficinas', this.usuario.datosUsuario.OFICINA)
        .toPromise();
      const banco: Catalogo = await this.catService.getCatalogoByTipoAndNombre('bancos', this.usuario.datosUsuario.BANCO)
        .toPromise();
      this.usuario.datosUsuario.OFICINA = oficina.valor;
      this.usuario.datosUsuario.BANCO = banco.valor;
      if(this.solicitud.tipo === 'SolicitudPrestamo'){
        this.aceptacionAvales = await this.avalService.getAceptacionesPorSolicitud(this.solicitud.id).toPromise();
        for(let aval of this.aceptacionAvales){
          let pay: CapacidadPago = await this.userService.capacidadPagoUsuario(aval.noEmpleadoAval).toPromise();
          aval.capacidadPago = pay.capacidadPago;
        }
      }


      this.loading = false;
    } catch (error) {
      this.alerts.push(error);
      this.loading = false;
    }
  }

  public openModal(aprobacion: boolean): void {
    this.aprobacion = aprobacion;
    this.modalConfirmacion.show();
  }

  public cancelar(): void {
    this.aprobacion = false;
    this.modalConfirmacion.hide();
  }

  public aprobarSolicitud(): void {
      this.loading = true;
      this.modalConfirmacion.hide();
      const validacion = new Validacion(this.solicitud.idUsuario, this.solicitud.id, this.module, this.validador.email, true);
      this.validacionService.postValidacion(this.solicitud.idUsuario, this.solicitud.id, validacion)
        .toPromise().then((result) => {
          this.success = 'Solicitud validada correctamente.';
          this.validated = true;
          this.loading = false;
          this.router.navigate([`../${this.module}/validaciones`]);
        }).catch(error => { this.alerts.push(error); this.loading = false; });
  }

  public rechazarSolicitud(): void {
      this.loading = true;
      this.modalConfirmacion.hide();
      const validacion = new Validacion(this.solicitud.idUsuario, this.solicitud.id,
        this.module, this.validador.email, false, this.razonRechazo);
      this.validacionService.postValidacion(this.solicitud.idUsuario, this.solicitud.id, validacion)
        .toPromise().then((result) => {
          this.success = 'Solicitud rechazada correctamente.';
          this.validated = true;
          this.loading = false;
          this.router.navigate([`../${this.module}/validaciones`]);
        }).catch(error => { this.alerts.push(error); this.loading = false; });
  }

}
