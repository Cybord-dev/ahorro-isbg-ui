import { Component, OnInit, ViewChild } from '@angular/core';
import { TabsetComponent } from 'ngx-bootstrap/tabs';
import { datusDummyTramite } from 'src/app/models/datusDummyTramite';
import { DummyTramitesAhorroService } from '../../../services/dummy-tramites-ahorro.service';

@Component({
  selector: 'cybord-tramites-ahorro',
  templateUrl: './tramites-ahorro.component.html',
  styleUrls: ['./tramites-ahorro.component.scss']
})
export class TramitesAhorroComponent implements OnInit {

  @ViewChild('headingTab')      
  private _headingTab:TabsetComponent;

  

  constructor(private dt:DummyTramitesAhorroService) { }

  public Params: any = { success: '',error:''}

  datusDummyUsuario = this.dt.datusDummyUsuario;
  datusDummyTramite = new datusDummyTramite();

 /*  public add(){
    this.dt.datusDummyTramite.push( this.datusDummyTramite );
    this.datusDummyTramite = new datusDummyTramite();
  }  */

  result(caso){
    switch (caso) {
      case 0:
        this.cleanAlerts();
        this.datusDummyUsuario[0].estadoTramite="Por Validar";
        this.Params.success = 'Has enviado una solicitud de Ahorro satisfactoriamente.';
        this._headingTab.tabs[1].active = true;
          break;
      case 1:
        this.cleanAlerts();
        this.datusDummyUsuario[0].estadoTramite="Por Validar";
        this.Params.success = 'Has enviado una Modificacion de Ahorro satisfactoriamente.';
          break;
      case 2:
        this.cleanAlerts();
        if(this.datusDummyUsuario[0].estadoTramite =="Por Validar"){
        this.Params.error = 'Aun no se ha validado tu solicitud.';
        }
        else{
          this.Params.success = 'Has enviado una solicitud de Retiro de Ahorro satisfactoriamente.';
        }

          break;
      case 3:
        this.cleanAlerts();
        this.datusDummyUsuario[0].estadoTramite="Cancelado";
        this.Params.error = 'Has cancelado el Ahorro satisfactoriamente.';
          break;
      case 4:
          console.log("It is a Thursday.");
          break;
    
  }
}

cleanAlerts(){
  this.Params.success = '';
  this.Params.error = '';
}

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

 

  ngOnInit(): void {
    this.cleanAlerts();
    if(this.datusDummyUsuario[0].estadoTramite =="Validado")
    this._headingTab.tabs[2].active = true;
  }

}
