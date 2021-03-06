import { Component, OnInit, ViewChild } from '@angular/core';
import { Usuario } from '../../../models/usuario';
import { UsuariosService } from '../../../services/usuarios.service';
import { ActivatedRoute } from '@angular/router';
import { AhorroServicio } from '../../../services/ahorro.service';
import { SaldoAhorro } from '../../../models/saldoahorro';
import { ModalDirective } from 'ngx-bootstrap/modal/public_api';
import { PrestamosService } from 'src/app/services/prestamos.service';
import { filter, map } from 'rxjs/operators';
import { Prestamo } from 'src/app/models/prestamo';
import { SaldoPrestamo } from 'src/app/models/saldoprestamo';

@Component({
  selector: 'cybord-ajuste-ahorro',
  templateUrl: './ajustes.component.html',
  styleUrls: ['./ajustes.component.scss']
})
export class AjustesComponent implements OnInit {

  @ViewChild('modalConfirmacion') public modalConfirmacion: ModalDirective;

  public usuario: Usuario = new Usuario();
  public ajustador: Usuario = new Usuario();
  public ahorros: SaldoAhorro[] = [];
  public totalAhorro: number = 0;

  public prestamos: Prestamo[] = [];
  public saldoPrestamos: SaldoPrestamo[] = [];
  public saldoPrestamo: number = 0;


  public alerts: string[] = [];
  public loading = false;

  public tipoAjuste: string;
  public montoAjuste: number = 0;
  public noEmpleado = '';
  public observaciones = '';
  public idPrestamo = '*';


  constructor(
    private userService: UsuariosService,
    private ahorroService: AhorroServicio,
    private prestamoService: PrestamosService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.userService.myInfo()
      .then(user => this.ajustador = user)
      .catch(error => this.alerts.push(error));

    this.route.paramMap.subscribe(route => {
      const id = route.get('idUsuario');
      this.loadSaldosInfo(+id);
      this.userService.getUsuario(+id).toPromise()
        .then(user => {
          this.usuario = user;
        }).catch((error) => this.alerts.push(error));
    });
  }

  public async loadSaldosInfo(userId: number) {
    try {

      this.ahorros = await this.ahorroService.getSaldoByUsuario(userId).toPromise();
      if (this.ahorros != undefined && this.ahorros.length > 0) {
        this.totalAhorro = this.ahorros.map(r => r.monto).reduce((a, b) => a + b);
      }

      let allDebts: Prestamo[] = await this.prestamoService.getPrestamosByUsuario(userId).toPromise();
      this.prestamos = allDebts.filter(p => p.estatus.indexOf('TERMINADO') < 0);
      this.saldoPrestamos = [];
      allDebts.forEach(p => this.saldoPrestamos.push(...p.saldosPrestamo));

      if (this.prestamos != undefined && this.prestamos.length > 0) {
        this.saldoPrestamo = this.prestamos.map(r => r.monto).reduce((a, b) => a + b);
        if (this.saldoPrestamos.length > 0) {
          let saldoPago = this.saldoPrestamos.filter(p => p.tipo !== 'INTERES').map(p => -1 * p.monto).reduce((a, b) => a + b);
          this.saldoPrestamo += saldoPago;
        }
      }
      this.loading = false;
    } catch (error) {
      this.loading = false;
      this.alerts.push(error);
    }


  }


  public createAdjustemnt(): void {
    this.loading = true;


    if (this.tipoAjuste === 'ahorros') {
      let ajusteAhorro: SaldoAhorro = new SaldoAhorro();
      ajusteAhorro.tipo = 'ajuste';
      ajusteAhorro.idUsuario = this.usuario.id;
      ajusteAhorro.validado = true;
      ajusteAhorro.monto = this.montoAjuste;
      ajusteAhorro.observaciones = this.observaciones;
      ajusteAhorro.solicitante = this.ajustador.email;
      this.ahorroService.postSaldo(this.usuario.id, ajusteAhorro)
        .toPromise().then(a => this.loadSaldosInfo(this.usuario.id))
        .catch((error) => { this.alerts.push(error); this.loading = false; });
    } else if (this.tipoAjuste === 'prestamos') {
      if(this.idPrestamo !== '*' && this.idPrestamo !== undefined){
        let saldoPrestamo = new SaldoPrestamo();
      saldoPrestamo.origen = this.ajustador.email;
      saldoPrestamo.idPrestamo = +this.idPrestamo;
      saldoPrestamo.monto = this.montoAjuste;
      saldoPrestamo.tipo = 'AJUSTE';
      saldoPrestamo.validado = 'EN_VALIDACION';
      saldoPrestamo.observaciones = this.observaciones;

       this.prestamoService.insertSaldoPrestamo(+this.idPrestamo, saldoPrestamo)
        .toPromise().then(a => this.loadSaldosInfo(this.usuario.id))
        .catch((error) => { this.alerts.push(error); this.loading = false; });
      }else{
        this.alerts.push('No se especifico el prestamo donde aplicar el movimiento de ajuste.');  
      }
    } else {
      this.alerts.push('No se reconoce el tipo de ajuste indicado.');
    }
    this.modalConfirmacion.hide();
  }

  public openModal(tipo: string): void {
    this.tipoAjuste = tipo;
    this.idPrestamo = '*';
    this.observaciones = '';
    this.montoAjuste = 0;
    this.noEmpleado = '';
    this.modalConfirmacion.show();
  }

  public cancelar(): void {
    this.modalConfirmacion.hide();
  }

}
