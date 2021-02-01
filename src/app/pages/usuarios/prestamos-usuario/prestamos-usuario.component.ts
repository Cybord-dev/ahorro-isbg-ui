import { Component, OnInit, ViewChild } from '@angular/core';
import { PrestamosService } from 'src/app/services/prestamos.service';
import { Prestamo } from 'src/app/models/prestamo';
import { SaldoPrestamo } from 'src/app/models/saldoprestamo';
import { UsuariosService } from '../../../services/usuarios.service';
import { ModalDirective } from 'ngx-bootstrap/modal/public_api';
import { Usuario } from 'src/app/models/usuario';

@Component({
  selector: 'cybord-prestamos-usuario',
  templateUrl: './prestamos-usuario.component.html',
  styleUrls: ['./prestamos-usuario.component.scss']
})
export class PrestamosUsuarioComponent implements OnInit {

  @ViewChild('modalConfirmacion') public modalConfirmacion: ModalDirective;

  constructor(
    private prestamoService:PrestamosService,
    private userService: UsuariosService
  ) { }

  public errorMessages: string[] = [];  
  public loading = false;
  public prestamos: Prestamo[] = [];
  public total: number = 0;
  public totalPendiente: number = 0;
  public informacion: SaldoPrestamo[] = [];
  private usuario: Usuario;
  public infoTotal: number = 0.0;
  public infoPendiente: number = 0.0;

  ngOnInit(): void {
    this.loading = true;
    this.loadInfo();
  }

  public async loadInfo(){
    try{
      this.usuario = await this.userService.myInfo();
      this.prestamos = await this.prestamoService.getPrestamosPendientesByUsuario(this.usuario.id).toPromise();
      this.prestamos.forEach(e => {
        this.total += e.monto;
        this.totalPendiente += e.saldoPendiente;
      });
      console.log(this.prestamos);
      this.loading = false;
    }catch(error){
      this.errorMessages.push(error);
      this.loading = false;
    }
    
  }

  public cerrar(): void {
    this.modalConfirmacion.hide();
    this.infoPendiente = 0.0;
    this.infoTotal = 0.0;
  }

  public mostrarInformacion(p:Prestamo):void{
    this.informacion = p.saldosPrestamo.filter(e => e.tipo.includes('PAGO'));
    this.informacion.forEach(e =>{
      this.infoTotal += e.monto;
    });
    this.infoPendiente = p.monto - this.infoTotal;
    this.modalConfirmacion.show();
  }

  public openModal(): void {
    this.modalConfirmacion.show();
  }

}
