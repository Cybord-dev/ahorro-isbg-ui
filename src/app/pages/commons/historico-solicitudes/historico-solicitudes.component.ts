import { Component, OnInit } from '@angular/core';
import { GenericPage } from '../../../models/generic-page';
import { ValidacionesService } from '../../../services/validaciones.service';
import { Router } from '@angular/router';
import { HistoricoValidacion } from '../../../models/historico-validacion';
import { ɵNoopAnimationDriver } from '@angular/animations/browser';

@Component({
  selector: 'cybord-historico-solicitudes',
  templateUrl: './historico-solicitudes.component.html',
  styleUrls: ['./historico-solicitudes.component.scss']
})
export class HistoricoSolicitudesComponent implements OnInit {

  public module = 'usuarios';
  public page: GenericPage<HistoricoValidacion> = new GenericPage();
  public pageSize = '10';

  public filterParams: any = { idSolicitud:'', nombre: '', noEmpleado: '', tipoUsuario: '', tipoSolicitud: '', 
  since: '',to: '', fechaEjecucion: '',  estatus: '', area:'', aprobada:'', page: '0', size: '10' };
  public userEmail: string;
  public loading = false;

  public arrayfechas: Date[] = [];

  constructor(
    private router: Router,
    private validacionService: ValidacionesService) { }

  ngOnInit(): void {
    this.module = this.router.url.split('/')[1];
    this.filterParams.area = this.module;
    this.updateDataTable(0, 10, this.filterParams);
  }


  public updateDataTable(currentPage?: number, pageSize?: number, filterParams?: any): void {
    this.filterParams.page = currentPage || 0;
    this.filterParams.size = pageSize || 10;

    this.validacionService.getValidaciones(this.filterParams).subscribe(data => this.page = data);
  }

  public onChangePageSize(pageSize: number): void {
    this.updateDataTable(this.page.number, pageSize);
  }

  public redirectToValidation(id: string): void {
    this.router.navigate([`./${this.module}/historico/${id}`]);
  }

}
