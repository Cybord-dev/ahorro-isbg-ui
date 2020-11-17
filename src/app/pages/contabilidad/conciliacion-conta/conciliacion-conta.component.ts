import { Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import * as XLSX from 'xlsx';
import { Conciliador } from 'src/app/models/conciliador';
import { AhorroServicio } from 'src/app/services/ahorro.service';

@Component({
  selector: 'cybord-conciliacion-conta',
  templateUrl: './conciliacion-conta.component.html',
  styleUrls: ['./conciliacion-conta.component.scss']
})
export class ConciliacionContaComponent implements OnInit {

  @ViewChild('fileInput') public fileInput: ElementRef;

  public datosConciliacion: Conciliador[] = [];
  public conciliacionProcesados: Conciliador[] = [];
  public conciliacionCorrectos: Conciliador[] = [];
  public conciliacionErroneos: Conciliador[] = [];
  public loading = false;
  constructor(private ahorroService: AhorroServicio) { }

  ngOnInit(): void {
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

    console.log('Request ' + JSON.stringify(this.conciliacionProcesados));
    /* const resultado = await this.ahorroService.postConciliacion(this.conciliacionProcesados).toPromise();
     const jsonRest = JSON.parse(JSON.stringify(resultado));
     console.log('Resultado ' + JSON.stringify(jsonRest));
    this.conciliacionCorrectos = jsonRest.correctos;
    this.conciliacionErroneos = jsonRest.errores; */
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


}
