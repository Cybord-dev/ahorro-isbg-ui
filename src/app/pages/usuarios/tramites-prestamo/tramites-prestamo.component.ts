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


  @ViewChild('modalConfirmacion') public modalConfirmacion: ModalDirective;

  @ViewChild('avalSelector') public avalSelector;

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
  public autocomplete: any;

  public solicitud: Solicitud = new Solicitud();
  public avalesList:Usuario[] = [];
  public avales:Usuario[] = [];

  public totalPagar:number = 0;
  public pagoQuincenal:number = 0;
  public noAvales:number = 0;
  

  constructor( public datepipe: DatePipe,
    private userService: UsuariosService,
    private solicitudService: SolicitudesService,
    private catService: CatalogosService) { }

  ngOnInit(): void {
    this.loading = true;
    this.loadRequestInfo();
    this.solicitud.atributos.NO_QUINCENAS = '24';
    this.solicitud.atributos.MONTO = '500';
  }

  public async loadRequestInfo(): Promise<void> {
    try {
      const user = await this.userService.myInfo();
      this.usuario = await this.userService.getUsuario(user.id).toPromise();
      console.log(this.usuario);
      const oficina: Catalogo = await this.catService.getCatalogoByTipoAndNombre('oficinas', this.usuario.datosUsuario.OFICINA)
        .toPromise();
      const banco: Catalogo = await this.catService.getCatalogoByTipoAndNombre('bancos', this.usuario.datosUsuario.BANCO)
        .toPromise();
      this.usuario.datosUsuario.OFICINA = oficina.valor;
      this.usuario.datosUsuario.BANCO = banco.valor;

      this.userService.getUsuarios({'tipoUsuario':this.usuario.tipoUsuario})
        .pipe(
          map((page:GenericPage<Usuario>) => page.content)
        ).subscribe(avales => {
          avales.splice(avales.findIndex(a=> a.noEmpleado === this.usuario.noEmpleado),1);
          this.avalesList = avales});


      this.loading = false;
    }catch (error) {
      this.alerts.push(error);
      this.loading = false;
    }
  }


  public onChangeNoQuincenas(value) {
    this.solicitud.atributos.NO_QUINCENAS = value;
    this.calculateValues();
  }

  public onChangeAmount(value){
    this.calculateValues();
    this.solicitud.atributos.MONTO = value;
  }

  public calculateValues() {
    let noAvales = 3;
    let monto:number = +this.solicitud.atributos.MONTO;
    if(monto<1000){
      noAvales = 1;
    }else if(monto>1000 && monto <2000){
      noAvales = 2;
    }else{
      noAvales = 3;
    }
    if(+this.usuario.datosUsuario.NO_AVALES < noAvales){
      noAvales = +this.usuario.datosUsuario.NO_AVALES;
    }
    this.noAvales = noAvales;

    this.totalPagar = monto + monto * 0.01 * (+this.solicitud.atributos.NO_QUINCENAS);
    this.pagoQuincenal = monto/(+this.solicitud.atributos.NO_QUINCENAS) + monto * 0.01;

    this.solicitud.atributos.DESCUENTO_QUINCENAL = `${this.pagoQuincenal}`;
    this.solicitud.atributos.TOTAL_A_PAGAR = `${this.totalPagar}`;
  }

  public avalSelected(aval:Usuario){
    this.avales.push(aval);
    this.avalesList.splice(this.avalesList.indexOf(aval),1);
    this.avalSelector.clear();
  }


  public debtRequest(){
    
    this.solicitudService.postSolictudUsuario(this.usuario.id,this.solicitud)
    .toPromise()
    .then(sucess=>{

    }).catch(error=>{
      this.alerts.push(error);
      this.loading = false;
    });
  }

}
