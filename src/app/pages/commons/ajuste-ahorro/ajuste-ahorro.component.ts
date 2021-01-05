import { Component, OnInit, ViewChild } from '@angular/core';
import { Usuario } from '../../../models/usuario';
import { UsuariosService } from '../../../services/usuarios.service';
import { ActivatedRoute } from '@angular/router';
import { AhorroServicio } from '../../../services/ahorro.service';
import { SaldoAhorro } from '../../../models/saldoahorro';
import { ModalDirective } from 'ngx-bootstrap/modal/public_api';

@Component({
  selector: 'cybord-ajuste-ahorro',
  templateUrl: './ajuste-ahorro.component.html',
  styleUrls: ['./ajuste-ahorro.component.scss']
})
export class AjusteAhorroComponent implements OnInit {

  @ViewChild('modalConfirmacion') public modalConfirmacion: ModalDirective;

  public usuario: Usuario = new Usuario();
  public ajustador: Usuario = new Usuario();
  public ahorros: SaldoAhorro[] = [];
  public total: number = 0;
  public alerts: string[] = [];
  public loading = false;

  public noEmpleado = '';
  public ajusteAhorro: SaldoAhorro = new SaldoAhorro();

  constructor(
    private userService: UsuariosService,
    private ahorroService: AhorroServicio,
    private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.userService.myInfo()
      .then(user => this.ajustador = user)
      .catch(error => this.alerts.push(error));

    this.route.paramMap.subscribe(route => {
      const id = route.get('idUsuario');
      this.userService.getUsuario(+id).toPromise()
        .then(user => {
          this.usuario = user;
          this.ahorroService.getSaldoByUsuario(user.id).toPromise()
          .then(resultado => {
            this.ahorros = resultado;
            if(resultado != undefined && resultado.length>0){
              this.total = resultado.map(r => r.monto).reduce((a, b) => a + b);
            }
          });
        }).catch((error) => this.alerts.push(error));
    });
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
