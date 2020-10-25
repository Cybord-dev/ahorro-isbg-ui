import { Component, OnInit } from '@angular/core';
import { GenericPage } from '../../../models/generic-page';
import { ValidacionesService } from '../../../services/validaciones.service';
import { Router } from '@angular/router';
import { HistoricoValidacion } from '../../../models/historico-validacion';

@Component({
  selector: 'cybord-historico-solicitudes',
  templateUrl: './historico-solicitudes.component.html',
  styleUrls: ['./historico-solicitudes.component.scss']
})
export class HistoricoSolicitudesComponent implements OnInit {

  public module = 'usuarios';
  public page: GenericPage<HistoricoValidacion> = new GenericPage();
  public pageSize = '10';
  public filterParams: any = { validador : '', idSolicitud: '', status: '', nombre: '', noEmpleado: '',
              idUsuario: '', tipo: '', aprobada: '', fechaCreacion: '', area : '', page: '0', size: '10' };
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
    const params: any = this.filterParams;

    params.page = currentPage !== undefined ? currentPage : this.filterParams.page;
    params.size = pageSize !== undefined ? pageSize : this.filterParams.size;

    this.validacionService.getValidaciones(params).subscribe(data => this.page = data);
  }

  public onChangePageSize(pageSize: number): void {
    this.updateDataTable(this.page.number, pageSize);
  }

  public redirectToValidation(id: string): void {
    this.router.navigate([`./${this.module}/historico/${id}`]);
  }

}
