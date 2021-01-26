import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Prestamo } from 'src/app/models/prestamo';
import { SaldoPrestamo } from 'src/app/models/saldoprestamo';
import { Usuario } from 'src/app/models/usuario';
import { UsuariosService } from '../../../services/usuarios.service';
import { PrestamosService } from '../../../services/prestamos.service'; 

@Component({
  selector: 'cybord-pagos-prestamos',
  templateUrl: './pagos-prestamos.component.html',
  styleUrls: ['./pagos-prestamos.component.scss']
})
export class PagosPrestamosComponent implements OnInit {


  @ViewChild('modalConfirmacion') public modalConfirmacion: ModalDirective;

  public usuario: Usuario = new Usuario();
  public prestamos: Prestamo[] = [];
  public total: number = 0;
  public alerts: string[] = [];
  public loading = false;

  public noEmpleado = '';

  public pago:SaldoPrestamo = new SaldoPrestamo();

  constructor(
    private userService : UsuariosService,
    private prestamoService: PrestamosService) { }

  ngOnInit(): void {
    this.userService.myInfo()
      .then(user => this.usuario = user)
      .then(()=> this.prestamoService.getPrestamosByUsuario(this.usuario.id).subscribe(p=>this.prestamos = p))
      .catch(error => this.alerts.push(error));
  }

}
