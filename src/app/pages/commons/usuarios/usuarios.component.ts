import { Component, OnInit } from '@angular/core';
import { GenericPage } from '../../../models/generic-page';
import { Router} from '@angular/router';
import { UsuariosService } from '../../../services/usuarios.service';

@Component({
  selector: 'cybord-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {


  public module = 'recursos-humanos';
  public page: GenericPage<any> = new GenericPage();
  public pageSize = '10';

  public filterParams: any = {email: '', estatus: '*', nombre: '',tipoUsuario:'', page: '0', size: '10' };

  constructor(
    private userService: UsuariosService,
    private router: Router) { }

  ngOnInit(): void {
    this.module = this.router.url.split('/')[1];
    this.updateDataTable(0, 10);
  }

  public updateDataTable(currentPage?: number, pageSize?: number, filterParams?: any) {
    this.filterParams.page = currentPage || 0;
    this.filterParams.size  || 10;
    this.userService.getUsuarios(this.filterParams).subscribe(data => this.page = data);
  }

  public onChangePageSize(pageSize: number) {
    this.updateDataTable(this.page.number, pageSize);
  }

  public redirectToUser(id: string): void {
    this.router.navigate([`../${this.module}/usuarios/${id}`]);
  }

  public redirectToAdjustment(id: string): void {
    this.router.navigate([`../contabilidad/ajustes/${id}`]);
  }

}
