import {Component, OnInit} from '@angular/core';
import { UsuariosService } from '../../services/usuarios.service';
import { Usuario } from '../../models/usuario';
import { menu } from '../../mock-data/menus';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent implements OnInit {

  public sidebarMinimized = false;
  public usuario = new Usuario();


  public constructor(private userService: UsuariosService){
  }


  ngOnInit(): void {
    this.userService.myInfo()
    .then((user: Usuario) => this.usuario = user);
  }

  public logout(): void {
    this.userService.logout().toPromise()
    .then(() => console.log('completed logout'))
    .then(() => {console.log('Calling logout');})
    .catch((error) => {
      console.log('Error request', error);
    });
  }

  public toggleMinimize(e): void{
    this.sidebarMinimized = e;
  }
}
