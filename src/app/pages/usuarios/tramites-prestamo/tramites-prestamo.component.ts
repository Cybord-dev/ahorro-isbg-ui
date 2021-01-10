import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal/public_api';
import { CatalogosService } from '../../../services/catalogos.service';
import { Catalogo } from '../../../models/catalogo';
import { Usuario } from '../../../models/usuario';
import { DatePipe } from '@angular/common';
import { UsuariosService } from '../../../services/usuarios.service';
import { SolicitudesService } from '../../../services/solicitudes.service';
import { Solicitud } from '../../../models/solicitud';
import { map } from 'rxjs/operators';
import { GenericPage } from 'src/app/models/generic-page';

@Component({
  selector: 'cybord-tramites-prestamo',
  templateUrl: './tramites-prestamo.component.html',
  styleUrls: ['./tramites-prestamo.component.scss']
})
export class TramitesPrestamoComponent implements OnInit {


  @ViewChild('modalConfirmacion') public modalConfirmacion: ModalDirective
  ;

  public oficinas: Catalogo[] = [];
  public loading = false;
  public usuario: Usuario = new Usuario();
  public noEmpleado: '';
  public totalAhorro = 0;
  public errorMessages: string[] = [];
  public success = '';
  public tipoSolicitud = 'SolicitudAhorro';
  public alerts: string[] = [];
  public enabledDates = [];

  public solicitud: Solicitud = new Solicitud();
  public avales:Usuario[] = [];

  constructor( public datepipe: DatePipe,
    private userService: UsuariosService,
    private solicitudService: SolicitudesService,
    private catService: CatalogosService) { }

  ngOnInit(): void {
    this.loading = true;
    this.loadRequestInfo();
    this.solicitud.atributos.NO_QUINCENAS = '24';
  }

  public async loadRequestInfo(): Promise<void> {
    try {
      const user = await this.userService.myInfo();
      this.usuario = await this.userService.getUsuario(user.id).toPromise();
      const oficina: Catalogo = await this.catService.getCatalogoByTipoAndNombre('oficinas', this.usuario.datosUsuario.OFICINA)
        .toPromise();
      const banco: Catalogo = await this.catService.getCatalogoByTipoAndNombre('bancos', this.usuario.datosUsuario.BANCO)
        .toPromise();
      this.usuario.datosUsuario.OFICINA = oficina.valor;
      this.usuario.datosUsuario.BANCO = banco.valor;

      this.userService.getUsuarios({'tipoUsuario':this.usuario.tipoUsuario})
        .pipe(
          map((page:GenericPage<Usuario>) => page.content)
        ).subscribe(avales => this.avales = avales);


      this.loading = false;
    }catch (error) {
      this.alerts.push(error);
      this.loading = false;
    }
  }


  public onChangeSearch(search: string) {
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
  }

  public onFocused(e) {
    // do something
  }

}
