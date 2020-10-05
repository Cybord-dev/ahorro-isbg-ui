import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../../../services/usuarios.service';
import { Usuario } from '../../../models/usuario';
@Component({
  selector: 'cybord-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {



  public profileInfo: Usuario = new Usuario();

  public alerts: string[] = [];

  public bsConfig = { containerClass: 'theme-dark-blue' };

  constructor(private userService: UsuariosService) { }

  ngOnInit(): void {
    this.userService.myInfo().toPromise()
    .then(user => {
      this.userService.getUsuario(user.id).toPromise().then(u => this.profileInfo = u);
    }).catch((error) => this.alerts.push(error));
  }

}
