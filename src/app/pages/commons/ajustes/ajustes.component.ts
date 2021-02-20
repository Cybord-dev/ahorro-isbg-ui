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

  public noEmpleado = '';
  public ajusteAhorro: SaldoAhorro = new SaldoAhorro();

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

  public async loadSaldosInfo(userId: number){
    try{

      this.ahorros = await this.ahorroService.getSaldoByUsuario(userId).toPromise();
      if(this.ahorros != undefined && this.ahorros.length>0){
        this.totalAhorro = this.ahorros.map(r => r.monto).reduce((a, b) => a + b);
      }

      let allDebts: Prestamo[] = await this.prestamoService.getPrestamosByUsuario(userId).toPromise();
      this.prestamos = allDebts.filter(p => p.estatus.indexOf('TERMINADO') < 0);
      this.saldoPrestamos = [];
      allDebts.forEach(p=> this.saldoPrestamos.push(...p.saldosPrestamo));

      if(this.prestamos != undefined && this.prestamos.length>0 && this.saldoPrestamos.length > 0){
        this.saldoPrestamo = this.prestamos.map(r => r.monto).reduce((a, b) => a + b);
        let saldoPago = this.saldoPrestamos.filter(p => p.tipo !== 'INTERES').map(p => -1* p.monto).reduce((a, b) => a + b);
        this.saldoPrestamo += saldoPago;
      }



      this.loading = false;
    }catch(error){
      this.loading = false;
      this.alerts.push(error);
    }

    
  }


  public createAdjustemnt(): void{
    this.loading = true;
    this.ajusteAhorro.tipo = 'ajuste';
    this.ajusteAhorro.idUsuario = this.usuario.id;
    this.ajusteAhorro.validado = true;
    this.ajusteAhorro.solicitante = this.ajustador.email;
    this.ahorroService.postSaldo(this.usuario.id, this.ajusteAhorro)
    .toPromise().then(a => console.log(a)).then(() => {
      this.ahorroService.getSaldoByUsuario(this.usuario.id).toPromise()
      .then(resultado => {
        this.ahorros = resultado;
        this.total = resultado.map(r => r.monto).reduce((a, b) => a + b);
        this.loading = false;
      });
    }).catch((error) => { this.alerts.push(error); this.loading = false;});
    this.modalConfirmacion.hide();
  }

  public openModal(): void {
    this.modalConfirmacion.show();
  }

  public cancelar(): void {
    this.modalConfirmacion.hide();
  }

}
