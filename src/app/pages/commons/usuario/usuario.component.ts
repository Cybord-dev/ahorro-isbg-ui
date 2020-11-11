import { Component, OnInit, ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DatoUsuario } from '../../../models/dato-usuario';
import { UsuariosService } from '../../../services/usuarios.service';
import { Usuario } from '../../../models/usuario';
import { RolCat } from '../../../models/rolcat';
import { ModalDirective } from 'ngx-bootstrap/modal/public_api';


@Component({
  selector: 'cybord-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss']
})
export class UsuarioComponent implements OnInit {


  @ViewChild('modalConfirmacion') public modalConfirmacion: ModalDirective;

  public registerForm: FormGroup;
  public submitted = false;
  public loading = false;
  public usuario: Usuario = new Usuario();
  public errorMessages: string[] = [];
  public mensajeModal = '';
  public params: any = { success: '', message: '', id: '*', module: 'usuarios', interno: false };
  public antiguedad: Date;
  public maxDate: Date;

  public roles = { USUARIO: true, RECURSOS_HUMANOS: false, TESORERIA: false, CONTABILIDAD: false,
     GERENCIA_INTERNA: false, GERENCIA_EXTERNA: false, ADMINISTRACION: false, DIRECCION: false };
  private nombreRoles = Object.keys(this.roles);
  constructor(
    public datepipe: DatePipe,
    private route: ActivatedRoute,
    private usuarioServicio: UsuariosService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  public ngOnInit(): void {
    this.maxDate = new Date();
    this.loading = true;
    this.errorMessages = [];
    this.params.module = this.router.url.split('/')[1];
    this.antiguedad = new Date();

    this.route.paramMap.subscribe(route => {
      const id = route.get('idUsuario');
      if (id !== '*') {
        this.updateUserInfo(+id);
        this.registerForm = this.formBuilder.group({
          email: [{ value: this.usuario.email, disabled: true }],
          alias: [this.usuario.nombre, [Validators.maxLength(100), Validators.minLength(2),
          Validators.pattern('^([0-9a-zA-ZÀ-ú.,&-_!¡"\' ]+)$')]],
          activo: [this.usuario.activo],
          tipo: [this.usuario.tipoUsuario],
          oficina: [this.usuario.datosUsuario.OFICINA],
          banco: [this.usuario.datosUsuario.BANCO],
          noEmpleado: [this.usuario.noEmpleado],
          cuenta: [this.usuario.datosUsuario.CUENTA],
          sueldo: [this.usuario.datosUsuario.SUELDO],
          antiguedad: [this.usuario.datosUsuario.ANTIGUEDAD]
        });

      } else {
        this.antiguedad = new Date();
        this.registerForm = this.formBuilder.group({
          email: [{ value: this.usuario.email, disabled: false, },
          [Validators.required, Validators.email, Validators.pattern('^[a-z0-9A-Z._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
          alias: ['', [Validators.required, Validators.maxLength(100), Validators.minLength(2),
          Validators.pattern('^([0-9a-zA-ZÀ-ú.,&-_!¡"\' ]+)$')]],
          activo: [this.usuario.activo],
          tipo: [this.usuario.tipoUsuario],
          oficina: [this.usuario.datosUsuario.OFICINA],
          banco: [this.usuario.datosUsuario.BANCO],
          noEmpleado: [this.usuario.noEmpleado],
          cuenta: [this.usuario.datosUsuario.CUENTA],
          sueldo: [this.usuario.datosUsuario.SUELDO],
          antiguedad: [this.usuario.datosUsuario.ANTIGUEDAD]
        });
        this.loading = false;
      }

    });
  }

  private updateUserInfo(id: number): void {
    this.errorMessages = [];
    this.usuarioServicio.getUsuario(id).toPromise()
      .then(user => {
        this.usuario = user;
        this.loading = false;
        this.antiguedad = new Date(user.datosUsuario.ANTIGUEDAD);
        for (const role of user.roles) {
          this.roles[role] = true;
        }
      }).catch(error => this.errorMessages.push(error));
  }




  public toggleUserType(): void {
    if (this.usuario.tipoUsuario === 'INTERNO') {
      this.usuario.tipoUsuario = 'EXTERNO';
    } else {
      this.usuario.tipoUsuario = 'INTERNO';
    }
  }


  public openModal(): void {
    if(this.usuario.id !== undefined){
      this.mensajeModal = '¿Actualizar usuario?';
    }else{
      this.mensajeModal = '¿Registrar usuario?';
    }
    this.modalConfirmacion.show();
  }

  public decline(): void {
    this.modalConfirmacion.hide();
  }




  get f() { return this.registerForm.controls; }

  public update(): void {
    this.errorMessages = [];
    this.loading = true;
    this.modalConfirmacion.hide();
    if (this.registerForm.invalid) {
      this.loading = false; 
      if(this.registerForm.get('alias').invalid){
        this.errorMessages.push("Nombre invalido");
      }
      return;
    }
    this.errorMessages = [];
    this.usuarioServicio.actualizaUser(this.usuario).toPromise()
      .then(async updateduser => {
        if(this.usuario.datosUsuario.ANTIGUEDAD !== undefined){
          this.usuario.datosUsuario.ANTIGUEDAD = this.datepipe.transform(this.antiguedad, 'yyyy-MM-dd');
        }
        for (const key in this.usuario.datosUsuario) {
          if (key !== undefined && this.usuario.datosUsuario[key] !== undefined && this.usuario.datosUsuario[key] !== "" && this.usuario.datosUsuario[key] !== null) {
            if (updateduser.datosUsuario[key] !== this.usuario.datosUsuario[key]) {
              const dato = new DatoUsuario(key, this.usuario.datosUsuario[key]);
              await this.usuarioServicio.actualizaDatoUsuario(this.usuario.id, key, dato)
                .toPromise();
            }
          }
        }
        if (this.params.module === 'administracion') {
          console.log('Updating user roles');
          var i = 0;
          for (const role in this.roles) { // QUITA ROLES EXISTENTES
            if (this.roles[role] === false // ROLE EN FALSO
              && this.usuario.roles.find(x => x === role)) { // PERO YA EXISTE EN EL USER
              await this.usuarioServicio.deleteRoles(this.usuario.id,
                this.nombreRoles[i]).toPromise();
            }
            i++;
          }
          for (const role in this.roles) { // AGREGAR NUEVOS ROLES

            if (this.roles[role] === true // ROLE EN TRUE
              && !this.usuario.roles.find(x => x === role)) { // PERO NO EXISTE EN EL USER
              await this.usuarioServicio.insertarRoles(this.usuario.id, new RolCat(role)).toPromise();
            }
          }
        }
        this.submitted = true;
        this.params.success = 'El usuario ha sido actualizado satisfactoriamente.';
      })
      .then(() => this.router.navigate([`../${this.params.module}/usuarios/`+this.usuario.id]))
      .catch(error => {this.errorMessages.push(error); this.loading = false;});
      
  }

  public register(): void {
    this.errorMessages = [];
    let id = 0;
    console.log('registering',this.registerForm.invalid);
    this.loading = true;
    this.modalConfirmacion.hide();
    
    if(this.registerForm.get('email').invalid){
      this.errorMessages.push("Email invalido");
      this.loading = false; 
      return;
    }
    if(this.registerForm.get('alias').invalid){
      this.errorMessages.push("Nombre invalido");
      this.loading = false; 
      return;
    }
    if(this.registerForm.get('activo').invalid){
      this.errorMessages.push("El usuario debe ser activo");
      this.loading = false; 
      return;
    }
    if(this.usuario.noEmpleado === undefined || this.usuario.noEmpleado === ""){
      this.errorMessages.push("Llena el campo de No. de empleado");
      this.loading = false; 
      return;
    }
    if(this.usuario.datosUsuario.OFICINA === undefined || this.usuario.datosUsuario.OFICINA === "" || this.usuario.datosUsuario.OFICINA === "*"){
      this.errorMessages.push("Llena el campo de oficina");
      this.loading = false; 
      return;
    }
    if(this.usuario.datosUsuario.BANCO === undefined || this.usuario.datosUsuario.BANCO === "" || this.usuario.datosUsuario.BANCO === "*"){
      this.errorMessages.push("Llena el campo de banco");
      this.loading = false; 
      return;
    }
    if(this.usuario.datosUsuario.SUELDO === undefined || this.usuario.datosUsuario.SUELDO === "" || this.usuario.datosUsuario.SUELDO === "*"){
      this.errorMessages.push("Llena el campo de sueldo");
      this.loading = false; 
      return;
    }
      
    
    //if (this.registerForm.invalid) { this.loading = false; return; }
    this.errorMessages = [];
    console.log('registering');
    this.usuario.datosUsuario.ANTIGUEDAD = this.datepipe.transform(this.antiguedad, 'yyyy-MM-dd');
    this.usuarioServicio.insertarUsuario(this.usuario).toPromise()
      .then(async createdUser => {
        id = createdUser.id;
        for (const key in this.usuario.datosUsuario) {
          if (key !== undefined && this.usuario.datosUsuario[key] !== undefined) {
            const valor = this.usuario.datosUsuario[key];
            await this.usuarioServicio.insertarDatoUsuario(createdUser.id, new DatoUsuario(key, valor)).toPromise();
          }
        }
        for (const role in this.roles) { // AGREGAR NUEVOS ROLES
          if (this.roles[role] === true) {
            await this.usuarioServicio.insertarRoles(createdUser.id, new RolCat(role)).toPromise();
          }
        }
        this.submitted = true;
      })
      .then(() => this.router.navigate([`../${this.params.module}/usuarios`]))
      .catch(error => {this.errorMessages.push(error); this.loading = false;});
  }

  private async updateRoles(): Promise<void> {
    for (const role in this.roles) { // QUITA ROLES EXISTENTES
      if (this.roles[role] === false // ROLE EN FALSO
        && this.usuario.roles.find(x => x === role)) { // PERO YA EXISTE EN EL USER
        await this.usuarioServicio.deleteRoles(this.usuario.id,
          this.roles[role]).toPromise();
      }
    }
    for (const role in this.roles) { // AGREGAR NUEVOS ROLES

      if (this.roles[role] === true // ROLE EN TRUE
        && !this.usuario.roles.find(x => x === role)) { // PERO NO EXISTE EN EL USER
        await this.usuarioServicio.insertarRoles(this.usuario.id, new RolCat(role)).toPromise();
      }
    }
  }


  public clearInput() {
    this.usuario = new Usuario();
    this.params.success = '';
    this.errorMessages = [];
    this.submitted = false;
  }


}
