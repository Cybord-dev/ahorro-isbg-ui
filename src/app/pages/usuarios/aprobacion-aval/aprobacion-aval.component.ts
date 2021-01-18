import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal/public_api';
import { GenericPage } from '../../../models/generic-page';
import { AvalService } from '../../../services/aval.service';
import { SolicitudesService } from '../../../services/solicitudes.service';
import { Aval } from '../../../models/aval';
import { Atributos } from '../../../models/atributos';

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
  public page: GenericPage<any> = new GenericPage();
  public loading = false;
  public mostrando = false;
  public informacion: any = {
    noEmpleado: "", atrib: Atributos, monto: "", nombreDeudor: "", status: ""
  }
  
  constructor(
    private avalService: AvalService,
    private solicitudService: SolicitudesService
    ) { }

  ngOnInit(): void {
  }

  public mostrarInformacion(fila: any): void {
    
  }

  public onChangePageSize(pageSize: number): void {
    
  }

  public openModal(status:Boolean): void {
    
    this.modalConfirmacion.show();
  }

  public updateDataTable(currentPage?: number, pageSize?: number, filterParams?: any): void{
    this.loading = true;
    
  }

}
