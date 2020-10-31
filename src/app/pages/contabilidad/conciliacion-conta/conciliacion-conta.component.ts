import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';
import { AhorroExterno } from 'src/app/models/ahorroExterno';

@Component({
  selector: 'cybord-conciliacion-conta',
  templateUrl: './conciliacion-conta.component.html',
  styleUrls: ['./conciliacion-conta.component.scss']
})
export class ConciliacionContaComponent implements OnInit {

  public datosConciliacion: AhorroExterno[];

  constructor() { }

  ngOnInit(): void {
    this.datosConciliacion = new Array<AhorroExterno>();
  }


  async onFileChange(files): Promise<any> {
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
          const nombre: string = jsonActual[keys[0]];

          if (!nombre.includes('Deducc')){
            const renglon: AhorroExterno = new AhorroExterno(true, jsonActual[keys[0]], jsonActual[keys[1]], jsonActual[keys[2]]);
            console.log('Dato ' + JSON.stringify(renglon) );
            this.datosConciliacion.push(renglon);
          }
        }

      }

      };
    reader.readAsBinaryString(file);

    return true;
  }

}
