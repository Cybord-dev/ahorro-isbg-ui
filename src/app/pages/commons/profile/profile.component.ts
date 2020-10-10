import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuariosService } from '../../../services/usuarios.service';
import { Usuario } from '../../../models/usuario';

@Component({
  selector: 'cybord-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  public module: string = 'common';

  public disabled: boolean = true;

  public profileInfo: Usuario = new Usuario();

  public alerts: string[] = [];

  public bsConfig = { containerClass: 'theme-dark-blue' };

  constructor(private userService: UsuariosService,
    private router: Router) { }

  ngOnInit(): void {

    this.module = this.router.url.split('/')[1];

    console.log(this.module);

    this.disabled = false;

    this.userService.myInfo().toPromise()
    .then(user => {
      console.log(user);
      this.userService.getUsuario(user.id).toPromise().then(u => this.profileInfo = u);
    }).catch((error) => this.alerts.push(error));
  }

}
