import { Component, OnInit } from '@angular/core';
import { SolicitudesService } from '../../../services/solicitudes.service';
import { Solicitud } from '../../../models/solicitud';

@Component({
  selector: 'cybord-validaciones-report',
  templateUrl: './validaciones-report.component.html',
  styleUrls: ['./validaciones-report.component.scss']
})
export class ValidacionesReportComponent implements OnInit {

  public solicitudes: Solicitud[] = [];

  constructor(private solicitudesService: SolicitudesService) { }

  ngOnInit(): void {

    this.solicitudesService.getSolicitudes({})
      .toPromise().then(s => this.solicitudes = s);

  }

}
