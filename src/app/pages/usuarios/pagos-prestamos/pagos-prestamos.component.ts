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
  public prestamo: Prestamo = new Prestamo();

  public pago:SaldoPrestamo = new SaldoPrestamo();




  constructor(
    private userService : UsuariosService,
    private prestamoService: PrestamosService) { }

  ngOnInit(): void {
    this.loadInfo();
  }


  public async loadInfo(){
    this.usuario = await this.userService.myInfo();
    let allDebts:Prestamo[] = await this.prestamoService.getPrestamosByUsuario(this.usuario.id).toPromise();
    this.prestamos = allDebts.filter(p => p.estatus.indexOf('TERMINADO')<0);
    if(this.prestamos!== undefined && this.prestamos.length > 0){
      this.total = this.prestamos.map(p=>p.saldoPendiente).reduce((a,b)=>a+b);
    }
  }

  public openModal(prestamo:Prestamo): void {
    this.prestamo = prestamo;
    this.modalConfirmacion.show();
  }

  public closeModal(): void {
    this.prestamo = new Prestamo();
    this.modalConfirmacion.hide();
  }

}
