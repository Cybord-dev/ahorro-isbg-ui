import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SolicitudesService } from 'src/app/services/solicitudes.service';
import { GenericPage } from '../../../models/generic-page';

@Component({
  selector: 'cybord-reporte-solicitudes',
  templateUrl: './reporte-solicitudes.component.html',
  styleUrls: ['./reporte-solicitudes.component.scss']
})
export class ReporteSolicitudesComponent implements OnInit {

  public module = 'usuarios';
  public page: GenericPage<any> = new GenericPage();
  public pageSize = '10';
  public filterParams: any = { emisor: '', remitente: '', prefolio: '', status: '*', since: undefined, to: undefined, lineaEmisor: '', solicitante: '', page: '0', size: '10' };
  public userEmail: string;
  public loading = false;

  public arrayfechas: Date[] = [];

  constructor(private router: Router,
    private solicitudesService: SolicitudesService,

  ) { }

  ngOnInit(): void {
    this.module = this.router.url.split('/')[1];
    this.updateDataTable(0, 10);
    console.log(this.module);

    for (let index = 0; index < 11; index++) {

      this.arrayfechas[index] = this.randomDate();
    }
  }

  public randomDate() {
    return new Date(new Date(2012, 0, 1).getTime() + Math.random() * (new Date().getTime() - new Date(2012, 0, 1).getTime()));
  }

  public updateDataTable(currentPage?: number, pageSize?: number, filterParams?: any) {
    const pageValue = currentPage || 0;
    const sizeValue = pageSize || 10;
    this.solicitudesService.getSolicitudes(pageValue, sizeValue, this.filterParams).subscribe(data => this.page = data);
  }

  public onChangePageSize(pageSize: number) {
    this.updateDataTable(this.page.number, pageSize);
  }

  public redirectToValidation(id: string) {
    this.router.navigate([`./${this.module}/validacione/${id}`]);
  }

}
