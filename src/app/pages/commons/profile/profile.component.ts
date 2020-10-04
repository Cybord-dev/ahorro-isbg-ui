import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../../../services/usuarios.service';
import { Usuario } from '../../../models/usuario';
@Component({
  selector: 'cybord-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {


  public profileInfo: Usuario;

  constructor(private userService: UsuariosService) { }

  ngOnInit(): void {
    this.userService.myInfo().subscribe(user => {
      this.userService.getUsuario(user.id).subscribe(u => this.profileInfo = u);
    });
  }

}
