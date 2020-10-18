import { Component, OnInit, Renderer2 } from '@angular/core';
import * as XLSX from 'xlsx';
import {AhorroExterno} from '../../../models/ahorroExterno' ;
import { UsuariosService } from 'src/app/services/usuarios.service';
import { Usuario } from 'src/app/models/usuario';



@Component({
  selector: 'cybord-ahorro-externos',
  templateUrl: './ahorro-externos.component.html',
  styleUrls: ['./ahorro-externos.component.scss']
})
export class AhorroExternosComponent implements OnInit {

  
  public datosAhorro: AhorroExterno[];
  
  constructor(
    private renderer: Renderer2,
    public userService: UsuariosService
    
    ) { }

  ngOnInit(): void {
    this.datosAhorro = new Array<AhorroExterno>()
  }


  onFileChange(files) {
    //console.log("File ",  files);
    let workBook = null;
    let jsonData = null;
    const reader = new FileReader();
    const file = files[0];
    
    reader.onload = (event) => { 
      const data = reader.result;
      workBook = XLSX.read(data, { type: 'binary' });
      jsonData = workBook.SheetNames.reduce((initial, name) => {
        const sheet = workBook.Sheets[name];
        initial[name] = XLSX.utils.sheet_to_json(sheet, {range:3});
        XLSX.utils.sheet_to_json(sheet,)
        return initial;
      }, {});
            
      let key; 
      for (key in jsonData){};
      
      //console.log("JsonData ", jsonData);

      let jsonArray= jsonData[key];
        for (let i = 0; i < jsonArray.length; i++) {
          //console.log("JsonArray ", jsonArray[i]);
           let aceptar: boolean;




           aceptar = jsonArray[i].CLAVE === undefined || jsonArray[i].NSS === undefined || jsonArray[i].NOMBRE  === undefined || jsonArray[i].Ahorra === undefined || jsonArray[i].Importe === undefined;
          
           let usuario: Usuario = new Usuario();

          if(jsonArray[i].CLAVE != undefined){
            
            console.log("ENtro ");
            this.userService.getUsuario(jsonArray[i].CLAVE).toPromise()
            .then(user => usuario = user);
            console.log("Usuario de base", usuario)
          
          }

          // console.log("aceptar ", aceptar);
             
            let ahorroActual: AhorroExterno =  new AhorroExterno(!aceptar, jsonArray[i].CLAVE,jsonArray[i].NSS,  jsonArray[i].NOMBRE, jsonArray[i].Ahorra,jsonArray[i].Importe);
            //console.log("Ahorro Actual", ahorroActual); 
            this.datosAhorro.push(ahorroActual); 
          }
     //console.log("Ahorro Actual",  this.datosAhorro);
    }
    
    reader.readAsBinaryString(file);
  }

  clean() {
    this.datosAhorro = [];
    
  }

  cargar(){

    let datosEnvio  = this.datosAhorro.filter(dato => dato.aceptar);
    
    console.log("DATOS ENVIO ", datosEnvio)

  }


}
