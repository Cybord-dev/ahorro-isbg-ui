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
  
  public rolesArrayUpdate = { 1: false, 2: false, 3: false, 4: false, 5: false, 6: false };

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
          for (const role in this.rolesArrayUpdate) { // QUITA ROLES EXISTENTES
            if (this.rolesArrayUpdate[role] === false // ROLE EN FALSO
                    && this.usuario.roles.find(x => x.rolname.id === +role)) { // PERO YA EXISTE EN EL USER
              await this.usuarioServicio.deleteRoles(
                this.usuario.roles.find(x => x.rolname.id === +role).id).toPromise();
            }
          }
          for (const role in this.rolesArrayUpdate) { // AGREGAR NUEVOS ROLES

            if (this.rolesArrayUpdate[role] === true // ROLE EN TRUE
              && !this.usuario.roles.find(x => x.rolname.id === +role)) { // PERO NO EXISTE EN EL USER
                console.log("sss  "+role);
                await this.usuarioServicio.insertarRoles( updateduser.id, new Rol(+role)).toPromise();
            }
          }
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
          for (const role in this.rolesArrayUpdate) {
            if (this.rolesArrayUpdate[role] !== false) {
              console.log("sss  "+role);
              this.usuarioServicio.insertarRoles( createdUser.id,new Rol(+role)).subscribe(
                data => {
                  this.Params.success = 'El usuario ha sido creado satisfactoriamente.';
                },
                (error: HttpErrorResponse) => this.errorMessages.push(error.error.message
                  || `${error.statusText} : ${error.message}`));
            }
          }
        }, (error: HttpErrorResponse) => this.errorMessages.push(error.error.message
          || `${error.statusText} : ${error.message}`));
  }

  toggle(checked: boolean, rol: string) {
    this.rolesArrayUpdate[rol] = checked;
  }

  public clearInput(){
    this.usuario = new Usuario();
    for (const role in this.rolesArrayUpdate) {     
        this.rolesArrayUpdate[role] = false;   
    }
    this.Params.success = '';
    this.errorMessages = [];
    this.submitted = false;
  }

  private updateUserInfo(id: number) {
    this.errorMessages = [];
    this.usuarioServicio.getUsuario(id).subscribe(
      userdata => {
        this.usuario = userdata;
        for (const role in this.usuario.roles) {
          if (role) {
            this.rolesArrayUpdate[this.usuario.roles[role].id] = true;
          }
        }
        this.loading = false;
      },
      (error: HttpErrorResponse) => this.errorMessages.push(error.error.message
        || `${error.statusText} : ${error.message}`));
  }
}
