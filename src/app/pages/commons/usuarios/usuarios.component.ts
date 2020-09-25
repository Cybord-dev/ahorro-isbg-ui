import { Component, OnInit } from '@angular/core';
import { GenericPage } from '../../../models/generic-page';
import { UsuariosData } from '../../../data/usuarios-data';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'cybord-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {


  public module = 'recursos-humanos';
  public page: GenericPage<any> = new GenericPage();
  public pageSize = '10';

  public filterParams: any = {email: '', estatus: '*', nombre: ''};

  constructor(
    private userService: UsuariosData,
    private router: Router) { }

  ngOnInit() {
    this.module = this.router.url.split('/')[1];
    this.updateDataTable(0, 10);
  }

  public updateDataTable(currentPage?: number, pageSize?: number, filterParams?: any) {
    const pageValue = currentPage || 0;
    const sizeValue = pageSize || 10;
    this.userService.getUsuarios(pageValue, sizeValue, this.filterParams).subscribe(data => this.page = data);
  }

  public onChangePageSize(pageSize: number) {
    this.updateDataTable(this.page.number, pageSize);
  }

  public redirectToUser(id: string) {
    console.log(`redirecting to ./recursos-humanos/usuarios/${id}`);
    this.router.navigate([`./recursos-humanos/usuarios/${id}`]);
  }

  public editar(id:number){
    console.log(`redirecting to ./recursos-humanos/usuarios/${id}`);
    this.router.navigate([`./recursos-humanos/usuarios/${id}`]);
  }

  public redirectToRoles(id:number){
    console.log(`redirecting to ./administracion/roles/${id}`);
    this.router.navigate([`./administracion/roles/${id}`]);
  }
 
}
