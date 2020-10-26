import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../../models/usuario';
import { UsuariosService } from '../../../services/usuarios.service';
import { ActivatedRoute } from '@angular/router';
import { AhorroServicio } from '../../../services/ahorro.service';
import { SaldoAhorro } from '../../../models/saldoahorro';

@Component({
  selector: 'cybord-ajuste-ahorro',
  templateUrl: './ajuste-ahorro.component.html',
  styleUrls: ['./ajuste-ahorro.component.scss']
})
export class AjusteAhorroComponent implements OnInit {

  public usuario: Usuario = new Usuario();
  public ajustador: Usuario = new Usuario();
  public ahorros: SaldoAhorro[] = [];
  public total: number;
  public alerts: string[] = [];

  public ajusteAhorro: SaldoAhorro = new SaldoAhorro();

  constructor(
    private userService: UsuariosService,
    private ahorroService: AhorroServicio,
    private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.userService.myInfo().toPromise()
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
            this.total = resultado.map(r => r.monto).reduce((a, b) => a + b);
          });
        }).catch((error) => this.alerts.push(error));
    });
  }

  public createAdjustemnt(): void{
    this.ajusteAhorro.idUsuario = this.usuario.id;
    this.ajusteAhorro.validado = true;
    this.ajusteAhorro.solicitante = this.ajustador.email;
    this.ahorroService.postSaldo(this.usuario.id, this.ajusteAhorro)
    .toPromise().then(a => console.log(a)).then(() => {
      this.ahorroService.getSaldoByUsuario(this.usuario.id).toPromise()
      .then(resultado => {
        this.ahorros = resultado;
        this.total = resultado.map(r => r.monto).reduce((a, b) => a + b);
      });
    }).catch((error) => this.alerts.push(error));
  }

}
