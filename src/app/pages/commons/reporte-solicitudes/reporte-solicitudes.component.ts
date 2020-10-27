import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SolicitudesService } from '../../../services/solicitudes.service';
import { GenericPage } from '../../../models/generic-page';
import { Solicitud } from '../../../models/solicitud';

@Component({
  selector: 'cybord-reporte-solicitudes',
  templateUrl: './reporte-solicitudes.component.html',
  styleUrls: ['./reporte-solicitudes.component.scss']
})
export class ReporteSolicitudesComponent implements OnInit {

  public module = 'usuarios';
  public page: GenericPage<Solicitud> = new GenericPage();
  public pageSize = '10';
  public filterParams: any = { fechaEjecucion :'' ,tipoSolicitud:'', since:'', to: '',  idSolicitud: '', estatus: '', nombre: '', noEmpleado: '', tipoUsuario: '', page: '0', size: '10' };
  public userEmail: string;
  public loading = false;


  constructor(
    private router: Router,
    private solicitudesService: SolicitudesService) { }

  ngOnInit(): void {
    this.module = this.router.url.split('/')[1];

    switch (this.module) {
      case 'recursos-humanos':
        this.filterParams.estatus = 'ValidacionRH';
        break;
      case 'tesoreria':
        this.filterParams.estatus = 'ValidacionTeso';
        break;
      case 'contabilidad':
        this.filterParams.estatus = 'ValdiacionConta';
        break;
      case 'gerencia':
        this.filterParams.estatus = 'ValidacionGerencia';
        break;
      case 'administracion':
        this.filterParams.estatus = 'ValidaAdmin';
        break;
      default:
        break;
    }
    this.updateDataTable(0, 10, this.filterParams);
  }


  public updateDataTable(currentPage?: number, pageSize?: number, filterParams?: any): void {

    this.filterParams.page = currentPage || 0;
    this.filterParams.size = pageSize || 10;
    this.solicitudesService.getSolicitudes(this.filterParams).subscribe(data => this.page = data);
  }

  public onChangePageSize(pageSize: number): void {
    this.updateDataTable(this.page.number, pageSize);
  }

  public redirectToValidation(id: string): void {
    this.router.navigate([`./${this.module}/validacion/${id}`]);
  }

}
