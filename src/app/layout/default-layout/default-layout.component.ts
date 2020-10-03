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

  public navItems = menu;

  public constructor(private userService: UsuariosService){
  }


  ngOnInit(): void {
    this.userService.myInfo().subscribe((user: any) => {this.usuario = user;});
  }

  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }
}
