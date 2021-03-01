import { Component, OnInit } from '@angular/core';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'cybord-usuario-invalido',
  templateUrl: './usuario-invalido.component.html',
  styleUrls: ['./usuario-invalido.component.scss']
})
export class UsuarioInvalidoComponent implements OnInit {

  constructor(private userService: UsuariosService) { }

  ngOnInit(): void {
  }

  public logout(): void {
    this.userService.logout().toPromise()
    .then(() => console.log('completed logout'))
    .then(() => {console.log('Calling logout');})
    .catch((error) => {
      console.log("Error request")
      console.log(error);
      
    });
  }

}
