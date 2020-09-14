import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'cybord-reporte-ahorro',
  templateUrl: './reporte-ahorro.component.html',
  styleUrls: ['./reporte-ahorro.component.scss']
})
export class ReporteAhorroComponent implements OnInit {

  public bsValue: Date;
  enabledDates = [
    new Date('2020-09-15'),
    new Date('2020-10-01'),
    new Date('2020-10-15'),
    new Date('2020-11-01'),
    new Date('2020-11-15'),
    new Date('2020-12-01'),
    new Date('2020-12-15'),
  ];
  public bsConfig = {containerClass : 'theme-dark-blue'};


  constructor() {

  }

  ngOnInit(): void {

  }

}
