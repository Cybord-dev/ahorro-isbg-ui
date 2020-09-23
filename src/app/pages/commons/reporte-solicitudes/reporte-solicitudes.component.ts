import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GenericPage } from '../../../models/generic-page';

@Component({
  selector: 'cybord-reporte-solicitudes',
  templateUrl: './reporte-solicitudes.component.html',
  styleUrls: ['./reporte-solicitudes.component.scss']
})
export class ReporteSolicitudesComponent implements OnInit {


  public module: string = 'usuarios';
  public page: GenericPage<any> = new GenericPage();
  public pageSize = '10';
  public filterParams: any = { emisor: '', remitente: '', prefolio: '', status: '*', since: undefined, to: undefined, lineaEmisor: '', solicitante: '', page: '0', size: '10' };
  public userEmail: string;
  public loading = false;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.module = this.router.url.split('/')[2];
    console.log(this.module);
  }

}
