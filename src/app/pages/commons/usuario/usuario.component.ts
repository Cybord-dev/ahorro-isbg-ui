import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DatosUsuario } from '../../../models/datosusuario';
import { UsuariosService } from '../../../services/usuarios.service';
import { Usuario } from '../../../models/usuario';

@Component({
  selector: 'cybord-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss']
})
export class UsuarioComponent implements OnInit {

  registerForm: FormGroup;
  submitted = false;
  public loading = true;
  public usuario: Usuario = new Usuario();
  public errorMessages: string[] = [];

  public Params: any = { success: '', message: '', id: '*', module: 'usuarios' };
  public date = new Date;
  public datos: any = { ANTIGUEDAD: this.date, SUELDO: 0, NO_EMPLEADO: 0, OFICINA: '*' };


  constructor(
    private route: ActivatedRoute,
    private usuarioServicio: UsuariosService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {
    this.loading = true;
    this.errorMessages = [];
    this.Params.module = this.router.url.split('/')[1];

    this.route.paramMap.subscribe(route => {
      const id = route.get('idUsuario');
      if (id !== '*') {
        // actualiza informacion usuario
        this.updateUserInfo(+id);
        this.registerForm = this.formBuilder.group({
          email: [{ value: this.usuario.email, disabled: true }],
          alias: ['', [Validators.required, Validators.maxLength(20), Validators.minLength(2),
          Validators.pattern('^([0-9a-zA-ZÀ-ú.,&-_!¡" \' ]+)$')]],
          activo: ['Si', Validators.required],
          tipo: [this.usuario.tipoUsuario],
        });

      } else {
        //nuevo usuario
        this.date = new Date;
        this.registerForm = this.formBuilder.group({
          email: [{ value: this.usuario.email, disabled: false, },
          [Validators.required, Validators.email, Validators.pattern('^[a-z0-9A-Z._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
          alias: ['', [Validators.required, Validators.maxLength(20), Validators.minLength(2),
          Validators.pattern('^([0-9a-zA-ZÀ-ú.,&-_!¡"\' ]+)$')]],
          activo: ['Si', Validators.required],
          tipo: [this.usuario.tipoUsuario],
        });
        this.loading = false;
      }

    });

  }


  get f() { return this.registerForm.controls; }

  public async update() {
    this.submitted = true;
    this.loading = true;

    if (this.registerForm.invalid) { this.loading = false; return; }
    const id = this.usuario.id;
    /*
    this.usuarioServicio.actualizaUser(this.usuario).toPromise()
      .then(async updateduser => {
        this.Params.success = 'El usuario ha sido actualizado satisfactoriamente.';
        for (const d in this.datos) {
          if (this.datos[d] === undefined || this.datos[d] === '' || this.datos[d] === 0
            && updateduser.datosUsuario.find(x => x.tipoDato === d)) {
            await this.usuarioServicio.deleteDatosUsuario(
              updateduser.datosUsuario.find(x => x.tipoDato === d).id).toPromise();
          }
        }
        for (const d in this.datos) {
          await this.usuarioServicio.actualizaDatoUsuario(this.usuario.id, new DatosUsuario(d, this.datos[d], true)).toPromise();
        }
      }, (error: HttpErrorResponse) => this.errorMessages.push(error.error.message
        || `${error.statusText} : ${error.message}`))

      .then(() => this.updateUserInfo(id));*/
  }

  public registry() {
    this.submitted = true;
    if (this.registerForm.invalid) { this.loading = false; return; }
    this.errorMessages = [];
    this.usuarioServicio.insertarUsuario(this.usuario).subscribe(
      createdUser => {
        this.Params.success = 'El usuario ha sido creado satisfactoriamente.';

        for (const i in this.datos) {
          /*if (this.datos[i] !== undefined) {
            this.usuarioServicio.insertarDatosUsuario(createdUser.id, new DatosUsuario(i, this.datos[i], true)).subscribe(
              data => {
                this.Params.success = 'Datos insertados satisfactoriamente.';
              },
              (error: HttpErrorResponse) => this.errorMessages.push(error.error.message
                || `${error.statusText} : ${error.message}`));
          }*/
        }

      }, (error: HttpErrorResponse) => this.errorMessages.push(error.error.message
        || `${error.statusText} : ${error.message}`));
  }


  public clearInput() {
    this.usuario = new Usuario();
    this.Params.success = '';
    this.errorMessages = [];
    this.submitted = false;
  }

  private updateUserInfo(id: number) {
    this.errorMessages = [];
    this.usuarioServicio.getUsuario(id).subscribe(
      userdata => {
        this.usuario = userdata;

        for (const u in this.usuario.datosUsuario) {
          for (const i in this.datos) {
           /* if (this.usuario.datosUsuario[u].tipoDato === i) {
              this.datos[i] = this.usuario.datosUsuario[u].dato;
            }*/
          }
        }
        if (this.datos.ANTIGUEDAD)
          this.date = new Date(this.datos.ANTIGUEDAD);

      },
      (error: HttpErrorResponse) => this.errorMessages.push(error.error.message
        || `${error.statusText} : ${error.message}`));

  }
}
