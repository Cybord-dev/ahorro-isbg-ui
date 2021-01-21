import { Component, OnInit, ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { DatoUsuario } from '../../../models/dato-usuario';
import { UsuariosService } from '../../../services/usuarios.service';
import { Usuario } from '../../../models/usuario';
import { RolCat } from '../../../models/rolcat';
import { ModalDirective } from 'ngx-bootstrap/modal/public_api';
import { CatalogosService } from '../../../services/catalogos.service';
import { ValidationService } from '../../../services/validation.service';
import { Catalogo } from '../../../models/catalogo';


@Component({
  selector: 'cybord-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss']
})
export class UsuarioComponent implements OnInit {


  @ViewChild('modalConfirmacion') public modalConfirmacion: ModalDirective;

  public submitted = false;
  public loading = false;
  public usuario: Usuario = new Usuario();
  public errorMessages: string[] = [];
  public mensajeModal = '';
  public params: any = { success: '', message: '', id: '*', module: 'usuarios', interno: false };
  public antiguedad: Date;
  public maxDate: Date;

  public oficinas: Catalogo[] = [];
  public bancos: Catalogo[] = [];
  public cuentas: Catalogo[] = [];

  public roles = {
    USUARIO: true, RECURSOS_HUMANOS: false, TESORERIA: false, CONTABILIDAD: false,
    GERENCIA_INTERNA: false, GERENCIA_EXTERNA: false, ADMINISTRACION: false, DIRECCION: false
  };
  private nombreRoles = Object.keys(this.roles);
  constructor(
    public datepipe: DatePipe,
    private route: ActivatedRoute,
    private catService: CatalogosService,
    private usuarioServicio: UsuariosService,
    private router: Router,
    private validationService: ValidationService
  ) { }

  public ngOnInit(): void {
    this.maxDate = new Date();
    this.loading = true;
    this.errorMessages = [];
    this.params.module = this.router.url.split('/')[1];
    this.antiguedad = new Date();

    this.catService.getCatalogosByTipo('oficinas').subscribe(off => this.oficinas = off);
    this.catService.getCatalogosByTipo('bancos').subscribe(banks => this.bancos = banks);
    this.catService.getCatalogosByTipo('tipo-cuenta').subscribe(accounts => this.cuentas = accounts);

    this.route.paramMap.subscribe(route => {
      const id = route.get('idUsuario');
      if (id !== '*') {
        this.updateUserInfo(+id);
        this.loading = false;
      } else {
        this.antiguedad = new Date();
        this.loading = false;
      }
    });
  }

  private async updateUserInfo(id: number): Promise<void> {



    try {
      this.usuario = await this.usuarioServicio.getUsuario(id).toPromise();
      this.antiguedad = new Date(this.usuario.datosUsuario.ANTIGUEDAD);
      for (const role of this.usuario.roles) {
        this.roles[role] = true;
      }
    } catch (error) {
      this.loading = false;
      this.errorMessages.push(error);
    }
  }




  public toggleUserType(): void {
    if (this.usuario.tipoUsuario === 'INTERNO') {
      this.usuario.tipoUsuario = 'EXTERNO';
    } else {
      this.usuario.tipoUsuario = 'INTERNO';
    }
  }


  public openModal(): void {
    if (this.usuario.id !== undefined) {
      this.mensajeModal = '¿Actualizar usuario?';
    } else {
      this.mensajeModal = '¿Registrar usuario?';
    }
    this.modalConfirmacion.show();
  }

  public decline(): void {
    this.modalConfirmacion.hide();
  }


  public update(): void {
    this.errorMessages = [];
    this.loading = true;
    this.modalConfirmacion.hide();
    this.errorMessages = this.validationService.validarUsuario(this.usuario);
    if (this.errorMessages.length > 0) {
      this.loading = false;
      return;
    }
    this.usuarioServicio.actualizaUser(this.usuario).toPromise()
      .then(async updateduser => {
        if (this.usuario.datosUsuario.ANTIGUEDAD !== undefined) {
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
      .then(() => this.router.navigate([`../${this.params.module}/usuarios`]))
      .catch(error => { this.errorMessages.push(error); this.loading = false; });
  }

  public register(): void {
    this.errorMessages = [];
    let id = 0;
    this.loading = true;
    this.modalConfirmacion.hide();
    this.errorMessages = this.validationService.validarUsuario(this.usuario);
    if (this.errorMessages.length > 0) {
      this.loading = false;
    }
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
      .catch(error => { this.errorMessages.push(error); this.loading = false; });

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
