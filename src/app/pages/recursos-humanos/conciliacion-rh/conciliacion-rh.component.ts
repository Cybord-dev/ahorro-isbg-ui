import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as XLSX from 'xlsx';
import { Conciliador } from 'src/app/models/conciliador';
import { AhorroServicio } from 'src/app/services/ahorro.service';
import {NgxPaginationModule} from 'ngx-pagination';
import { ModalDirective } from 'ngx-bootstrap/modal/public_api';

@Component({
  selector: 'cybord-conciliacion-rh',
  templateUrl: './conciliacion-rh.component.html',
  styleUrls: ['./conciliacion-rh.component.scss']
})
export class ConciliacionRhComponent implements OnInit {

  @ViewChild('fileInput') public fileInput: ElementRef;
  @ViewChild('modalConfirmacion') public modalConfirmacion: ModalDirective;

  public datosConciliacion: Conciliador[];
  public conciliacionProcesados: Conciliador[];
  public conciliacionCorrectos: Conciliador[];
  public conciliacionErroneos: Conciliador[];
  public loading = false;
  public pCarga = 1;
  public pErroneos = 1;
  public pCorrectos = 1;

  constructor(private ahorroService: AhorroServicio) { }

  ngOnInit(): void {
    this.datosConciliacion = new Array<Conciliador>();
    this.conciliacionProcesados = new Array<Conciliador>();
    this.conciliacionCorrectos = new Array<Conciliador>();
    this.conciliacionErroneos = new Array<Conciliador>();
  }


  onFileChange(files): void {
    this.loading = true;
    let workBook = null;
    let jsonData = null;
    const reader = new FileReader();
    const file = files[0];

    reader.onload = (event) => {
      const data = reader.result;
      workBook = XLSX.read(data, { type: 'binary' });
      jsonData = workBook.SheetNames.reduce((initial, name) => {
        const sheet = workBook.Sheets[name];
        initial[name] = XLSX.utils.sheet_to_json(sheet, {range: 16});
        XLSX.utils.sheet_to_json(sheet, );
        return initial;
      }, {});
      let key: string;
      for (key in jsonData){}
      const jsonArray = jsonData[key];

      for (const jsonActual of jsonArray){
        const dato: JSON = JSON.parse(JSON.stringify(jsonActual));
        const keys = Object.keys(dato);

        if (Object.keys(dato).length === 3){

          const clave = String(jsonActual[keys[0]]);
          if (!clave.includes('Dedu')){
            let saldo: string = String(jsonActual[keys[2]]);
            saldo = saldo.replace(',', '');
            const renglon: Conciliador = new Conciliador(jsonActual[keys[0]], jsonActual[keys[1]], parseInt(saldo, 10));
            this.datosConciliacion.push(renglon);
          }
        }

      }

      };
    reader.readAsBinaryString(file);

    this.loading = false;
  }

  async validar(): Promise<any>{
    this.loading = true;
    this.conciliacionProcesados = this.datosConciliacion;
    this.datosConciliacion = [];
    const resultado = await this.ahorroService.postValidarInternos(this.conciliacionProcesados).toPromise();
    const jsonRest = JSON.parse(JSON.stringify(resultado));
    this.conciliacionCorrectos = jsonRest.correctos;
    this.conciliacionErroneos = jsonRest.errores;
    this.loading = false;
  }

  clean(): void {
    this.fileInput.nativeElement.value = null;
    this.datosConciliacion = [];
    this.conciliacionProcesados = [];
    this.conciliacionCorrectos = [];
    this.conciliacionErroneos = [];
    this.loading = false;
  }

  validarTodos(valor?: boolean): void{
    this.conciliacionErroneos.forEach(conciliacion => {
      conciliacion.validado = valor;
    });
  }

  conciliar(): void{
    if (this.conciliacionCorrectos.length === 0){
      alert('No hay Ahorradores validos para coinciliar');
      return;
    }

    let datosValidados = true;

    this.conciliacionErroneos.forEach(datos => {
        if (datos.validado === false){
          datosValidados = false;
        }
    });

    if (!datosValidados){
      alert('Existen Errores que no han sido aprobados');
      return;
    }

    this.openModal();
  }

  openModal(): void{

    this.modalConfirmacion.show();

  }

  decline(): void{
    this.modalConfirmacion.hide();
  }

  async conciliacion(): Promise<any> {
    this.loading = true;
    this.conciliacionCorrectos.forEach(valor => {valor.validado = true; });

    const response = await this.ahorroService.postConciliarInternos(this.conciliacionCorrectos).toPromise();
    this.decline();
    this.clean();
  }


}
