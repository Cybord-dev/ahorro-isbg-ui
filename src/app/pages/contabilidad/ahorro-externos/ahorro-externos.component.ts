import { Component, OnInit, Renderer2 } from '@angular/core';
import * as XLSX from 'xlsx';
import {AhorroExterno} from '../../../models/ahorroExterno' ;
import { UsuariosService } from 'src/app/services/usuarios.service';
import { Usuario } from 'src/app/models/usuario';
import { SaldoAhorro} from 'src/app/models/saldoahorro';
import { Validators } from '@angular/forms';
import { UsuarioComponent } from '../../commons/usuario/usuario.component';




@Component({
  selector: 'cybord-ahorro-externos',
  templateUrl: './ahorro-externos.component.html',
  styleUrls: ['./ahorro-externos.component.scss']
})
export class AhorroExternosComponent implements OnInit {

  
  public datosAhorro: AhorroExterno[];
  public errorMessages: string[] = [];
  public loading: boolean = false;
  public tablaValida: boolean = true;
  
  constructor(
    private renderer: Renderer2,
    public userService: UsuariosService
    
    ) { }

  ngOnInit(): void {
    this.datosAhorro = new Array<AhorroExterno>()
  }



  async cargaValida(files){

    let datosAhorroActual : AhorroExterno[] = await this.onFileChange(files);
    
    this.loading = false;

    console.log(" Tabla validada " + this.tablaValida);

    this.datosAhorro = datosAhorroActual;

  }


  onFileChange(files) {
    this.loading = true;
    let workBook = null;
    let jsonData = null;
    const reader = new FileReader();
    const file = files[0];
    let datosAhorroActual : AhorroExterno[] = new Array<AhorroExterno>() 
    

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
        let jsonArray= jsonData[key];

      
      let keys = Object.keys(jsonArray[0]);

        for (let i = 0; i < jsonArray.length; i++) {
           let aceptar: boolean;
           let usuario: Usuario = new Usuario();

          if(jsonArray[i][keys[0]] != undefined){
          

            this.userService.getUsuario(jsonArray[i][keys[0]]).toPromise()
            .then(user => {usuario = user
              let ahorroActual: AhorroExterno =  new AhorroExterno(!aceptar, jsonArray[i][keys[0]], jsonArray[i][keys[1]], jsonArray[i][keys[2]]);
               this.validar(user, ahorroActual); 
               datosAhorroActual.push(ahorroActual); 
            })
            .catch(error =>{
              console.log("Error " + error);
              let ahorroActual: AhorroExterno =  new AhorroExterno(false, jsonArray[i][keys[0]], jsonArray[i][keys[1]], jsonArray[i][keys[2]]);
              ahorroActual.observaciones = (" No es valida la clave del ahorrador " );
              datosAhorroActual.push(ahorroActual); 
              this.tablaValida = false;
            })
              
            }
            
          }
             
          
        }
        reader.readAsBinaryString(file);
        
      datosAhorroActual.sort((a, b) => a.clave.localeCompare(b.clave));

      return datosAhorroActual;
  }

  clean() {
    this.datosAhorro = new Array<AhorroExterno>();
    this.errorMessages = [];
    
  }

  cargar(){

    let saldoAhorro : SaldoAhorro [] = new Array<SaldoAhorro>();

    this.datosAhorro.forEach(ahorro => {
      let saldoAhorroActual: SaldoAhorro = new SaldoAhorro();
      saldoAhorroActual.id = ahorro.clave;
      saldoAhorroActual.tipo = "ahorro";
      saldoAhorroActual.monto = ahorro.importe;
      saldoAhorroActual.validado = true;

      saldoAhorro.push(saldoAhorroActual);

    })

    console.log("Saldo Ahorro" + JSON.stringify(saldoAhorro));

   }


 validar(usuario: Usuario, base: AhorroExterno){
     
      
      let validado: boolean = true;
      
      let usuarioNombre: string = usuario.nombre.trim();
      usuarioNombre = usuarioNombre.toUpperCase();

      let usuarioArray: string [] = usuarioNombre.split(" ");
      usuarioArray = usuarioArray.sort();

      let baseNombre: string = base.nombre.trim();
      baseNombre = baseNombre.toUpperCase();

      let baseArray: string[] =baseNombre.split (" ");
      baseArray = baseArray.sort();

      if(!(usuarioArray.length==baseArray.length && usuarioArray.every(function(v,i) { return v === baseArray[i] } ))){
         base.observaciones = (" No coincide el nombre del ahorrador ");
        validado = false;
      }

      if(!usuario.activo){
        base.observaciones = " El ahorrador no esta activo";
        validado = false;
      }
      
      if(base.importe === undefined || isNaN(base.importe) ){
        base.observaciones = " El importe no es correcto";
        validado = false;
      }

      if(base.observaciones === undefined){
        base.observaciones = "Validado";
      }

      if(!validado){
       
        this.tablaValida = false;
      }
      
  }

 


}
