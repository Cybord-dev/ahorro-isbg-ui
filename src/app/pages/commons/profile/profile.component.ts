import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../../../services/usuarios.service';
import { CatalogosService } from '../../../services/catalogos.service';
import { Usuario } from '../../../models/usuario';
import { Catalogo } from 'src/app/models/catalogo';

@Component({
  selector: 'cybord-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  public profileInfo: Usuario = new Usuario();
  public alerts: string[] = [];

  public oficinas: any[] = [];


  constructor(
    private catalogosService: CatalogosService,
    private userService: UsuariosService) { }

  ngOnInit(): void {
    this.catalogosService.getCatalogosByTipo('oficinas')
      .toPromise().then((oficinas) => {
        this.oficinas = oficinas;
      }).then(() => {
        this.loadProfileInfo();
      }).catch((error) => this.alerts.push(error));
  }

  public async loadProfileInfo(): Promise<void>{
    try {
      const user = await this.userService.myInfo().toPromise();
      const u = await this.userService.getUsuario(user.id).toPromise();
      const banco: Catalogo = await this.catalogosService.getCatalogoByTipoAndNombre('bancos', u.datosUsuario.BANCO)
        .toPromise();
      const oficina: Catalogo = await this.catalogosService.getCatalogoByTipoAndNombre('oficinas', u.datosUsuario.OFICINA)
        .toPromise();
      const tipoCuenta: Catalogo = await this.catalogosService.getCatalogoByTipoAndNombre('tipo-cuenta', u.datosUsuario.TIPO_CUENTA)
        .toPromise();
      this.profileInfo = u;
      this.profileInfo.datosUsuario.OFICINA = oficina.valor;
      this.profileInfo.datosUsuario.TIPO_CUENTA = tipoCuenta.valor;
      this.profileInfo.datosUsuario.BANCO = banco.valor;
    } catch (error) {
      this.alerts.push(error);
    }
  }



}
