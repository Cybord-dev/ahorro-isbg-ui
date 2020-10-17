import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DatoUsuario } from '../../../models/dato-usuario';
import { UsuariosService } from '../../../services/usuarios.service';
import { Usuario } from '../../../models/usuario';
import { RolCat } from '../../../models/rolcat';

@Component({
  selector: 'cybord-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss']
})
export class UsuarioComponent implements OnInit {

  registerForm: FormGroup;
  public submitted = false;
  public loading = false;
  public usuario: Usuario = new Usuario();
  public errorMessages: string[] = [];

  public params: any = { success: '', message: '', id: '*', module: 'usuarios', interno: false };
  public antiguedad: Date;

  public roles = { USUARIO: true, RECURSOS_HUMANOS: false, TESORERIA: false, CONTABILIDAD: false, GERENCIA: false, ADMINISTRACION: false };

  constructor(
    public datepipe: DatePipe,
    private route: ActivatedRoute,
    private usuarioServicio: UsuariosService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  public ngOnInit(): void {
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
          alias: ['', [Validators.required, Validators.maxLength(100), Validators.minLength(2),
          Validators.pattern('^([0-9a-zA-ZÀ-ú.,&-_!¡" \' ]+)$')]],
          activo: ['Si', Validators.required],
          tipo: [this.usuario.tipoUsuario],
        });

      } else {
        //nuevo usuario
        this.registerForm = this.formBuilder.group({
          email: [{ value: this.usuario.email, disabled: false, },
          [Validators.required, Validators.email, Validators.pattern('^[a-z0-9A-Z._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
          alias: ['', [Validators.required, Validators.maxLength(100), Validators.minLength(2),
          Validators.pattern('^([0-9a-zA-ZÀ-ú.,&-_!¡"\' ]+)$')]],
          activo: ['Si', Validators.required],
          tipo: [this.usuario.tipoUsuario],
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


  get f() { return this.registerForm.controls; }

  public update(): void {

    this.loading = true;

    if (this.registerForm.invalid) { this.loading = false; return; }
    this.errorMessages = [];
    this.usuarioServicio.actualizaUser(this.usuario).toPromise()
      .then(async updateduser => {
        console.log(updateduser);
        this.usuario.datosUsuario.ANTIGUEDAD = this.datepipe.transform(this.antiguedad, 'yyyy-MM-dd');
        for (const key in this.usuario.datosUsuario) {
          if (key !== undefined && this.usuario.datosUsuario[key] !== undefined) {
            if (updateduser.datosUsuario[key] !== this.usuario.datosUsuario[key]) {
              const dato = new DatoUsuario(key, this.usuario.datosUsuario[key]);
              await this.usuarioServicio.actualizaDatoUsuario(this.usuario.id, key, dato)
                .toPromise();
            }
          }
        }
        if (this.params.module === 'administracion') {
          console.log('Updating user roles');
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
        this.submitted = true;
        this.params.success = 'El usuario ha sido actualizado satisfactoriamente.';
      })
      .then(() => this.updateUserInfo(this.usuario.id))
      .catch(error => this.errorMessages.push(error));
  }

  public registry(): void {
    let id = 0;
    this.loading = true;
    if (this.registerForm.invalid) { this.loading = false; return; }
    this.errorMessages = [];
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
      .then(() => {
        this.params.success = 'El usuario ha sido creado satisfactoriamente.';
        this.updateUserInfo(id);
      }).catch(error => this.errorMessages.push(error));
  }

  private async updateRoles() {
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
