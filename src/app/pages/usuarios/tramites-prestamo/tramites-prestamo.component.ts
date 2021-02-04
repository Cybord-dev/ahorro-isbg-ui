import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal/public_api';
import { CatalogosService } from '../../../services/catalogos.service';
import { Catalogo } from '../../../models/catalogo';
import { Usuario } from '../../../models/usuario';
import { DatePipe } from '@angular/common';
import { UsuariosService } from '../../../services/usuarios.service';
import { SolicitudesService } from '../../../services/solicitudes.service';
import { AvalService } from '../../../services/aval.service';
import { Solicitud } from '../../../models/solicitud';
import { map } from 'rxjs/operators';
import { GenericPage } from 'src/app/models/generic-page';
import { Aval } from 'src/app/models/aval';

@Component({
  selector: 'cybord-tramites-prestamo',
  templateUrl: './tramites-prestamo.component.html',
  styleUrls: ['./tramites-prestamo.component.scss']
})
export class TramitesPrestamoComponent implements OnInit {


  @ViewChild('modalConfirmacion') public modalConfirmacion: ModalDirective;

  @ViewChild('avalSelector') public avalSelector;

  public oficinas: Catalogo[] = [];
  public loading = false;
  public usuario: Usuario = new Usuario();
  public noEmpleado: '';
  public totalAhorro = 0;
  public errorMessages: string[] = [];
  public success = '';
  public alerts: string[] = [];
  public enabledDates = [];
  public autocomplete: any;
  public bsValue: Date;

  public solicitud: Solicitud = new Solicitud();
  public avalesList: Usuario[] = [];
  public avales: Usuario[] = [];
  public aceptacionAvales: Aval[] = [];

  public totalPagar: number = 0;
  public pagoQuincenal: number = 0;
  public noAvales: number = 1;


  constructor(public datepipe: DatePipe,
    private userService: UsuariosService,
    private solicitudService: SolicitudesService,
    private catService: CatalogosService,
    private avalService: AvalService) { }

  ngOnInit(): void {
    this.loading = true;
    this.calculateEnabledDates();
    this.loadRequestInfo();
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

      this.userService.getUsuarios({ 'tipoUsuario': this.usuario.tipoUsuario, 'size': 1000 })
        .pipe(
          map((page: GenericPage<Usuario>) => page.content)
        ).subscribe(avales => {
          avales.splice(avales.findIndex(a => a.noEmpleado === this.usuario.noEmpleado), 1);
          this.avalesList = avales
        });

      const solicitudes: Solicitud[] = await this.solicitudService.getSolicitudesByUsuario(user.id).toPromise();
      let prestamo;
      if (solicitudes.length > 0) {
        prestamo = solicitudes.sort((a, b) => new Date(b.fechaCreacion).getTime() - new Date(a.fechaCreacion).getTime())
          .find(s => s.tipo === 'SolicitudPrestamo' && s.status !== 'Finalizada' && s.status !== 'Cancelada');
      }
      if (prestamo != undefined) {
        this.solicitud = prestamo;
        this.aceptacionAvales = await this.avalService.getAceptacionesPorSolicitud(prestamo.id).toPromise();
      } else {
        this.solicitud = new Solicitud('SolicitudPrestamo');
        this.solicitud.atributos.NO_QUINCENAS = '24';
        this.solicitud.atributos.MONTO = '500';
      }
      this.loading = false;
    } catch (error) {
      this.alerts.push(error);
      this.loading = false;
    }
  }


  public onChangeNoQuincenas(value) {
    this.solicitud.atributos.NO_QUINCENAS = value;
    this.calculateValues();
  }

  public onChangeAmount(value) {
    this.calculateValues();
    this.solicitud.atributos.MONTO = value;
  }

  public calculateValues() {
    let noAvales = 3;
    let monto: number = +this.solicitud.atributos.MONTO;
    if (monto <= 1000) {
      noAvales = 1;
    } else if (monto > 1000 && monto <= 2000) {
      noAvales = 2;
    } else {
      noAvales = 3;
    }

    if (+this.usuario.datosUsuario.NO_AVALES <= noAvales) {
      this.noAvales = +this.usuario.datosUsuario.NO_AVALES;
    }else{
      this.noAvales = noAvales;
    }
    this.totalPagar = monto + monto * 0.01 * (+this.solicitud.atributos.NO_QUINCENAS);
    this.pagoQuincenal = monto / (+this.solicitud.atributos.NO_QUINCENAS) + monto * 0.01;

    this.solicitud.atributos.DESCUENTO_QUINCENAL = `${this.pagoQuincenal}`;
    this.solicitud.atributos.TOTAL_A_PAGAR = `${this.totalPagar}`;
  }

  public avalSelected(aval: Usuario) {
    this.avales.push(aval);
    this.avalesList.splice(this.avalesList.indexOf(aval), 1);
    this.avalSelector.clear();
  }

  public removeAval(aval: Usuario){
    this.avalesList.push(aval);
    this.avales.splice(this.avales.indexOf(aval),1);
  }


  public async sendRequest() {

    try {
      this.loading = true;
      this.solicitud.idUsuario = this.usuario.id;
      this.solicitud.noEmpleado = this.usuario.noEmpleado;
      this.solicitud.nombre = this.usuario.nombre;
      this.solicitud.tipoUsuario = this.usuario.tipoUsuario;

      this.solicitud.atributos.FECHA = this.datepipe.transform(this.bsValue, 'yyyy-MM-dd');
      if (this.noAvales >= 1) {
        this.solicitud.atributos.AVAL1 = this.avales[0].id.toString();
      }
      if (this.noAvales >= 2) {
        this.solicitud.atributos.AVAL2 = this.avales[1].id.toString();
      }
      if (this.noAvales === 3) {
        this.solicitud.atributos.AVAL3 = this.avales[2].id.toString();
      }
      this.solicitud = await this.solicitudService.postSolictudUsuario(this.usuario.id, this.solicitud)
        .toPromise();
      
      this.modalConfirmacion.hide();

      this.aceptacionAvales = await this.avalService.getAceptacionesPorSolicitud(this.solicitud.id).toPromise();

      this.success = 'La solicitud de prestamo se ha enviado correctamente.';
    } catch (error) {
      this.alerts.push(error);
    }
    this.loading = false;
  }

  public async cancelRequest(){
    try{
      this.loading = true;
      this.solicitud.status = 'Cancelada';
      this.solicitud = await this.solicitudService.putSolictud(this.solicitud.id,this.solicitud).toPromise();
      this.success = 'La solicitud de prestamo se ha cancelado correctamente.';
    } catch (error) {
      this.alerts.push(error);
    }
    this.loading = false;
  }

  public openModal(): void {
    this.modalConfirmacion.show();
  }

  public cancelar(): void {
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
