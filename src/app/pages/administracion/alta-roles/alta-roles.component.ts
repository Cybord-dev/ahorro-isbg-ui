import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../../models/usuario';
import { UsuariosService } from '../../../services/usuarios.service';
import { ActivatedRoute } from '@angular/router';
import { from } from 'rxjs';

interface IHash {
  [key: string]: boolean;
}

@Component({
  selector: 'cybord-alta-roles',
  templateUrl: './alta-roles.component.html',
  styleUrls: ['./alta-roles.component.scss']
})
export class AltaRolesComponent implements OnInit {

  public loading = true;
  public usuario: Usuario = new Usuario();
  public errorMessages: string[] = [];

  public roles: IHash = { USUARIO: false, RECURSOS_HUMANOS: false, TESORERIA: false,CONTABILIDAD: false, GERENCIA: false, ADMINISTRACION: false};

  constructor(
    private route: ActivatedRoute,
    private userService: UsuariosService
  ) { }

  ngOnInit(): void {

    this.route.paramMap.subscribe(route => {
      const id = +route.get('idUsuario');
      this.userService.getUsuario(id).subscribe((user: Usuario) => {
        for (const role of user.roles) {
          this.roles[role.rolname.nombre] = true;
        }
        console.log(this.roles);
      });

    });
  }


}
