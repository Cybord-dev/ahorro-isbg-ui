import { Component, OnInit, Renderer2, ViewChild, resolveForwardRef } from '@angular/core';
import * as XLSX from 'xlsx';
import {AhorroExterno} from '../../../models/ahorroExterno' ;
import { UsuariosService } from 'src/app/services/usuarios.service';
import { Usuario } from 'src/app/models/usuario';
import { SaldoAhorro} from 'src/app/models/saldoahorro';
import { Validators } from '@angular/forms';
import { UsuarioComponent } from '../../commons/usuario/usuario.component';
import { ModalDirective } from 'ngx-bootstrap/modal/public_api';



@Component({
  selector: 'cybord-ahorro-externos',
  templateUrl: './ahorro-externos.component.html',
  styleUrls: ['./ahorro-externos.component.scss']
})
export class AhorroExternosComponent implements OnInit {


  @ViewChild('modalConfirmacion') public modalConfirmacion: ModalDirective;

  public datosAhorro: AhorroExterno[];
  public ahorroCarga: AhorroExterno[];
  public errorMessages: string[] = [];
  public loading = false;
  public tablaValida = true;

  constructor(
    private renderer: Renderer2,
    public userService: UsuariosService
    ) { }

  ngOnInit(): void {
    this.datosAhorro = new Array<AhorroExterno>();
    this.ahorroCarga = new Array<AhorroExterno>();
  }



 async cargaValida(files): Promise<any>{

    /*
    const promise = new Promise((resolve, reject) => {
      resolve(
      this.onFileChange(files)
      );
    });

    promise.then((res) => {
      console.log('Resultado: ' + res);
      this.loading = false;
      console.log(' Tabla validada ' + this.tablaValida);
      this.datosAhorro = this.ahorroCarga;

   } );

*/

   await this.onFileChange(files);
   this.loading = false;
   console.log(' Tabla validada ' + this.tablaValida);
   this.datosAhorro = this.ahorroCarga;

  }


  async onFileChange(files): Promise<any> {
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
        initial[name] = XLSX.utils.sheet_to_json(sheet, {range: 3});
        XLSX.utils.sheet_to_json(sheet, );
        return initial;
      }, {});
      let key: string;
      for (key in jsonData){}
      const jsonArray = jsonData[key];

      const keys = Object.keys(jsonArray[0]);

      for (const jsonActual of  jsonArray) {
          const aceptar = false;
          let usuario: Usuario = new Usuario();

          if (jsonActual[keys[0]] !== undefined){
            this.userService.getUsuario(jsonActual[keys[0]]).toPromise()
             .then(user => {
              usuario = user;
              const ahorroActual: AhorroExterno =  new AhorroExterno(!aceptar, jsonActual[keys[0]],
                jsonActual[keys[1]], jsonActual[keys[2]]);
              this.validar(user, ahorroActual);
              this.ahorroCarga.push(ahorroActual);
          })
          .catch(error => {
            const ahorroActual: AhorroExterno =  new AhorroExterno(false, jsonActual[keys[0]],
              jsonActual[keys[1]], jsonActual[keys[2]]);
            ahorroActual.observaciones = (' No es valida la clave del ahorrador ' );
            this.ahorroCarga.push(ahorroActual);
            this.tablaValida = false;
          });
          }
        }
      };
    reader.readAsBinaryString(file);

    return true;
  }

  clean(): void {
    this.datosAhorro = new Array<AhorroExterno>();
    this.ahorroCarga = new Array<AhorroExterno>();
    this.errorMessages = [];
  }

  cargar(): void {

    const saldoAhorro: SaldoAhorro [] = new Array<SaldoAhorro>();

    this.datosAhorro.forEach(ahorro => {
      const saldoAhorroActual: SaldoAhorro = new SaldoAhorro();
      saldoAhorroActual.id = ahorro.clave;
      saldoAhorroActual.tipo = 'ahorro';
      saldoAhorroActual.monto = ahorro.importe;
      saldoAhorroActual.validado = true;
      saldoAhorro.push(saldoAhorroActual);

    });

    console.log('Saldo Ahorro' + JSON.stringify(saldoAhorro));

   }


 validar(usuario: Usuario, base: AhorroExterno): void{
    let validado = true;
    let usuarioNombre: string = usuario.nombre.trim();
    usuarioNombre = usuarioNombre.toUpperCase();

    let usuarioArray: string [] = usuarioNombre.split(' ');
    usuarioArray = usuarioArray.sort();

    let baseNombre: string = base.nombre.trim();
    baseNombre = baseNombre.toUpperCase();

    let baseArray: string[] = baseNombre.split (' ');
    baseArray = baseArray.sort();

    if (!(usuarioArray.length === baseArray.length && usuarioArray.every( function(v,i)  { return v === baseArray[i]; } ))){
      this.agregarObservacion(base, 'No coincide el nombre del ahorrador');
      validado = false;
      }

    if (!usuario.activo){
      this.agregarObservacion(base, 'El ahorrador no esta activo');
      validado = false;
    }

    if (usuario.tipoUsuario !== 'EXTERNO' ){
      this.agregarObservacion(base, 'El usuario no es externo');
      validado = false;
    }

    if (!usuario.ahorrador){
      this.agregarObservacion(base, 'El usuario no es ahorrador');
      validado = false;
    }

    if (base.importe === undefined || isNaN(base.importe) ){
      this.agregarObservacion(base, 'El importe no es correcto');
      validado = false;
    }

    if (base.observaciones === undefined){
      this.agregarObservacion(base, 'Validado');
    }

    if (!validado){
      this.tablaValida = false;
    }
  }


  agregarObservacion(ahorrador: AhorroExterno, observacion: string): void{
    if (ahorrador.observaciones === undefined){
      ahorrador.observaciones = observacion;
    }
  else {
    ahorrador.observaciones += ', ' + observacion;
  }

}

  public openModal(): void{

    this.modalConfirmacion.show();

  }

  public decline(): void{
    this.modalConfirmacion.hide();
  }

}
