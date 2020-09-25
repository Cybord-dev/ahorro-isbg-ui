import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { UsuariosData } from '../../../data/usuarios-data';
import { Usuario } from '../../../models/usuario';
import { Rol } from '../../../models/rol';


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

  public Params: any = { success: '', message: '', id: '*'};

  constructor(
    private route: ActivatedRoute,
    private usuarioServicio: UsuariosData,
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
        });
       
      } else {
        //nuevo usuario
        this.registerForm = this.formBuilder.group({
          email: [{ value: this.usuario.email, disabled: false, },
              [Validators.required, Validators.email, Validators.pattern('^[a-z0-9A-Z._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
          alias: ['', [Validators.required, Validators.maxLength(20), Validators.minLength(2),
             Validators.pattern('^([0-9a-zA-ZÀ-ú.,&-_!¡"\' ]+)$')] ],
          activo: ['Si', Validators.required],
        });
        this.loading = false;
      }
     
    });
  }

  get f() { return this.registerForm.controls; }

  public  async update() {
    this.submitted = true;
    this.loading = true;
    
    if (this.registerForm.invalid) { this.loading = false ; return;}
    const id = this.usuario.id;
      this.usuarioServicio.actualizaUser(this.usuario).toPromise()
      .then(async updateduser => {
          this.Params.success = 'El usuario ha sido actualizado satisfactoriamente.';
        }, (error: HttpErrorResponse) => this.errorMessages.push(error.error.message
          || `${error.statusText} : ${error.message}`))
      .then(() => this.updateUserInfo(id));
  }

  public registry() {
    this.submitted = true;
    if (this.registerForm.invalid) { this.loading = false ; return;}
    this.errorMessages = [];
      this.usuarioServicio.insertarUsuario(this.usuario).subscribe(
        createdUser => {
          this.Params.success = 'El usuario ha sido creado satisfactoriamente.';
        }, (error: HttpErrorResponse) => this.errorMessages.push(error.error.message
          || `${error.statusText} : ${error.message}`));
  }

  public clearInput(){
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
        this.loading = false;
      },
      (error: HttpErrorResponse) => this.errorMessages.push(error.error.message
        || `${error.statusText} : ${error.message}`));
  }
}
