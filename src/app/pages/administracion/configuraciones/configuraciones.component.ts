import { Component, OnInit, ViewChild } from '@angular/core';
import { CatalogosService } from '../../../services/catalogos.service';
import { ModalDirective } from 'ngx-bootstrap/modal/public_api';
import { Catalogo } from '../../../models/catalogo';

@Component({
  selector: 'cybord-configuraciones',
  templateUrl: './configuraciones.component.html',
  styleUrls: ['./configuraciones.component.scss']
})
export class ConfiguracionesComponent implements OnInit {
  @ViewChild('modalConfirmacion') public modalConfirmacion: ModalDirective;
  constructor(
    private catService: CatalogosService
  ) { }
  public catConfig:Catalogo[] = [];

  public inicio:Catalogo = new Catalogo();
  public interes:Catalogo = new Catalogo();
  public retencion:Catalogo = new Catalogo();
  private contraCat:Catalogo;
  public contra:string = "";

  public alerts:string[] = [];
  public loading = false;

  ngOnInit(): void {
    this.getCatalogos();
  }

  private async getCatalogos(){
    this.loading = true;
    try{
      this.catConfig = await this.catService.getCatalogosByTipo("configuraciones").toPromise();
      let a = this.catConfig.filter(c => c.nombre == "INICIO-CAJA")[0];
      let b = this.catConfig.filter(c => c.nombre == "TASA-INTERES")[0];
      let c = this.catConfig.filter(c => c.nombre == "TASA-INTERES-RETENCION")[0];
      this.clone(this.inicio, a);
      this.clone(this.interes, b);
      this.clone(this.retencion, c);
      this.contraCat = this.catConfig.filter(c => c.nombre == "ADMIN-PASS")[0];
    }catch(error){
      this.loading=false;
      this.alerts.push(error);
    }
    this.loading=false;
    
  }
  public openModal():void{
    this.modalConfirmacion.show();
  }

  public closeModal(): void {
    this.modalConfirmacion.hide();
  }
  
  public guardarDatos(){
    this.loading = true;
    try{
      if(this.interes.valor !== this.catConfig.filter(c => c.nombre == "TASA-INTERES")[0].valor){
        this.catService.updateCatalogo(this.interes).toPromise();
      }
      if(this.retencion.valor !== this.catConfig.filter(c => c.nombre == "TASA-INTERES-RETENCION")[0].valor){
         this.catService.updateCatalogo(this.interes).toPromise();
      }
      if(this.inicio.valor !== this.catConfig.filter(c => c.nombre == "INICIO-CAJA")[0].valor){
        this.catService.updateCatalogo(this.interes).toPromise();
      }
      this.loading=false;
      this.closeModal();
      window.location.reload();
    }catch(error){
      this.loading=false;
      this.alerts.push(error);
    }
    
  }

  public clone(a:Catalogo, b:Catalogo){
    a.id = b.id;
    a.nombre = b.nombre;
    a.tipo = b.tipo;
    a.valor = b.valor;
  }
}
