import { Component, OnInit, Renderer2, ViewChild, resolveForwardRef, ElementRef } from '@angular/core';
import * as XLSX from 'xlsx';
import {AhorroExterno} from '../../../models/ahorroExterno' ;
import { UsuariosService } from 'src/app/services/usuarios.service';
import { AhorroServicio } from 'src/app/services/ahorro.service';
import { Usuario } from 'src/app/models/usuario';
import { SaldoAhorro} from 'src/app/models/saldoahorro';
import { Validators } from '@angular/forms';
import { UsuarioComponent } from '../../commons/usuario/usuario.component';
import { ModalDirective } from 'ngx-bootstrap/modal/public_api';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';



@Component({
  selector: 'cybord-ahorro-externos',
  templateUrl: './ahorro-externos.component.html',
  styleUrls: ['./ahorro-externos.component.scss']
})
export class AhorroExternosComponent implements OnInit {


  @ViewChild('modalConfirmacion') public modalConfirmacion: ModalDirective;
  @ViewChild('fileInput') public fileInput: ElementRef;

  public datosAhorro: AhorroExterno[];
  public errorMessages: string[] = [];
  public loading = false;
  public tablaValida = true;

  constructor(
    private renderer: Renderer2,
    private userService: UsuariosService,
    private ahorroService: AhorroServicio
    ) { }

  ngOnInit(): void {
    this.datosAhorro = new Array<AhorroExterno>();
  }

 onFileChange(files): void {

    if (files.length === 0){
      return;

    }

    this.tablaValida = true;
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

      this.cargarValidar(jsonArray);
      };
    reader.readAsBinaryString(file);

  }

  async cargarValidar(jsonArray): Promise<void>{

    const keys = Object.keys(jsonArray[0]);

    for (const jsonActual of  jsonArray) {
      const aceptar = false;
      let usuario: Usuario = new Usuario();

      if (jsonActual[keys[0]] !== undefined){
        const ahorroActual: AhorroExterno =  new AhorroExterno(!aceptar, jsonActual[keys[0]],
          jsonActual[keys[1]], jsonActual[keys[2]]);

        this.datosAhorro.push(ahorroActual);
        try{
        usuario = await this.userService.getUsuario(jsonActual[keys[0]]).toPromise();
        this.validar(usuario, ahorroActual);
        }
        catch (error){
          ahorroActual.observaciones = (' No es valida la clave del ahorrador ' );
          this.tablaValida = false;
        }
      }
    }

    this.loading = false;
    console.log('Tabla validad ' + this.tablaValida);

  }

  clean(): void {
    this.fileInput.nativeElement.value = null;
    this.datosAhorro = new Array<AhorroExterno>();
    this.errorMessages = [];
  }

  cargar(): void {

    const saldoAhorro: SaldoAhorro [] = new Array<SaldoAhorro>();

    this.datosAhorro.forEach(ahorro => {
      const saldoAhorroActual: SaldoAhorro = new SaldoAhorro();
      saldoAhorroActual.idUsuario = ahorro.clave;
      saldoAhorroActual.tipo = 'ahorro';
      saldoAhorroActual.monto = ahorro.importe;
      saldoAhorroActual.validado = true;
      saldoAhorro.push(saldoAhorroActual);

    });


    this.ahorroService.postSaldoBulk(saldoAhorro).toPromise()
    .then(saldo => {
        alert('Se registraron depositos de ' + saldo.length + ' ahorradores');
        this.clean();
        this.modalConfirmacion.hide();
      })
    .catch(error=>{
      alert('Se registro un error al cargar los ahorros ' + error);
      this.modalConfirmacion.hide();
    });
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
