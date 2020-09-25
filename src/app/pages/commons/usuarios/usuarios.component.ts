import { Component, OnInit } from '@angular/core';
import { GenericPage } from '../../../models/generic-page';
import { UsuariosData } from '../../../data/usuarios-data';
import { Router } from '@angular/router';

@Component({
  selector: 'cybord-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {

  public page: GenericPage<any> = new GenericPage();
  public pageSize = '10';

  public filterParams: any = {email: '', estatus: '*', nombre: ''};

  constructor(private userService: UsuariosData,
    private router: Router) { }

  ngOnInit() {
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
    this.router.navigate([`../recursos-humanos/usuarios/${id}`]);
  }

  public Editar(id:number){
    this.router.navigate([`./recursos-humanos/usuarios/${id}`]);
  }
 
}
