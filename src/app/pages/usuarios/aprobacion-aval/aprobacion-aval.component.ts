import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal/public_api';
import { GenericPage } from '../../../models/generic-page';
import { AvalService } from '../../../services/aval.service';
import { SolicitudesService } from '../../../services/solicitudes.service';
import { UsuariosService } from '../../../services/usuarios.service';
import { AceptacionAval } from '../../../models/aceptacion-aval';
import { Atributos } from '../../../models/atributos';
import { Usuario } from 'src/app/models/usuario';

@Component({
  selector: 'cybord-aprobacion-aval',
  templateUrl: './aprobacion-aval.component.html',
  styleUrls: ['./aprobacion-aval.component.scss']
})
export class AprobacionAvalComponent implements OnInit {

  @ViewChild('modalConfirmacion') public modalConfirmacion: ModalDirective;

  public errorMessages: string[] = [];
  public mensajeModal = '';
  public params: any = { success: '', message: '', id: '*', module: 'usuarios' };
  public avales: AceptacionAval[] = [];
  public loading = false;
  public mostrando = false;
  public informacion: any = {
    noEmpleado: "", atrib: Atributos, monto: "", nombreDeudor: "", status: ""
  }
  private noEmpleado: string = "33334444";

  public usuario : Usuario = new Usuario();
  
  constructor(
    private avalService: AvalService,
    private solicitudService: SolicitudesService,
    private userService: UsuariosService
    ) { }

  ngOnInit(): void {
    this.userService.myInfo()
      .then(user => {
        this.noEmpleado = user.noEmpleado
        console.log("===>"+this.noEmpleado);
        this.avalService.getAceptacionesPendientesPorNoEmpleado(this.noEmpleado).toPromise()
        .then(data => {
          this.avales = data; this.loading = false;
        })
        .catch(error => this.errorMessages.push(error));
      })
      .catch(error => this.errorMessages.push(error));

      
  }


  public mostrarInformacion(aval: AceptacionAval): void {
    console.log(aval);
  }

  public fecha(dato: string): string{
    var temp  = new Date(dato);
    var tokens = temp.toString().split(" ");
    return tokens[2] + "/" + (temp.getMonth()+1) + "/" + temp.getFullYear();
  }

  public openModal(status:Boolean): void {
    this.modalConfirmacion.show();
  }

}
