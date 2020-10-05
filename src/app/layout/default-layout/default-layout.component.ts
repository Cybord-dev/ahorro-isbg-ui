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
    this.userService.myInfo().subscribe((user: Usuario) => this.usuario = user);
  }

  public logout(): void {
    this.userService.logout().subscribe({
      next(r) { console.log(r) },
      error(e) { console.error(e) },
      complete() { this.document.location.href = "https://mail.google.com/mail/u/0/?logout&hl=en"}
    });
  }

  public toggleMinimize(e): void{
    this.sidebarMinimized = e;
  }
}
