import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Prestamo } from 'src/app/models/prestamo';
import { SaldoPrestamo } from 'src/app/models/saldoprestamo';
import { Usuario } from 'src/app/models/usuario';
import { UsuariosService } from '../../../services/usuarios.service';
import { PrestamosService } from '../../../services/prestamos.service';
import { Recurso } from 'src/app/models/recurso';
import { RecursoService } from 'src/app/services/recurso.service';
import { ValidationService } from 'src/app/services/validation.service';

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
  
  public loading = false;

  




  constructor(
    private userService: UsuariosService,
    private prestamoService: PrestamosService,
    ) { }

  ngOnInit(): void {
   
  }


  



}
