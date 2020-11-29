import { Component, OnInit } from '@angular/core';
import { PrestamosService } from '../../../services/prestamos.service';
import { SaldoPrestamo } from '../../../models/saldoprestamo';
import { UsuariosService } from '../../../services/usuarios.service';

@Component({
  selector: 'cybord-tramites-prestamo',
  templateUrl: './tramites-prestamo.component.html',
  styleUrls: ['./tramites-prestamo.component.scss']
})
export class TramitesPrestamoComponent implements OnInit {
  public alerts: string[] = [];
  public loading = false;
 
  constructor(
    private prestamoService:PrestamosService,
    private userService:UsuariosService
  ) { }

  ngOnInit(): void {
    this.loading = true;
    this.userService.myInfo().toPromise()
      .then((user) => {
        
      })
      .catch(error => this.alerts.push(error))
      .then(() => this.loading = false);
  }

}
