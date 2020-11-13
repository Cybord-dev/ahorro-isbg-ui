import { Component, OnInit } from '@angular/core';
import { AhorroServicio } from '../../../services/ahorro.service';
import { UsuariosService } from '../../../services/usuarios.service';
import { SaldoAhorro } from '../../../models/saldoahorro';
import { Meses } from 'src/app/models/meses';
import { map } from 'rxjs/operators';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'cybord-reporte-ahorro',
  templateUrl: './reporte-ahorro.component.html',
  styleUrls: ['./reporte-ahorro.component.scss']
})
export class ReporteAhorroComponent implements OnInit {


  public loading = false;
  public total: number;
  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels: string[] = ['NOVIEMBRE', 'DICIEMBRE', 'ENERO', 'FEBRERO', 'MARZO', 'ABRIL', 'MAYO', 'JUNIO', 'JULIO', 'AGOSTO', 'SEPTIEMBRE', 'OCTUBRE'];
  public datos: number[] = [];
  public errorMessages: string[] = [];
  public successMessage: string;

  public barChartData: any[] = [];
  public ahorros: SaldoAhorro[] = [];
  constructor(
    private userService: UsuariosService,
    public datepipe: DatePipe,
    private saldosAhorro: AhorroServicio) {

  }

  ngOnInit(): void {
    this.loading = true;
    this.userService.myInfo().toPromise()
      .then((user) => {
        this.setCharInfo(user.id);
      })
      .catch(error => this.errorMessages.push(error))
      .then(() => this.loading = false);
      this.barChartData = [{data:[0, 0], label: "Ahorro acumulado"}];
  }

  private async setCharInfo(userId:number): Promise <void> {
    try {
      const MESES: Meses = new Meses();
      const saldos: SaldoAhorro[] = await this.saldosAhorro.getSaldoByUsuario(userId)
      .pipe( map( (s: SaldoAhorro[]) => {
        for (const s1 of s) {
          console.log(new Date(s1.fechaCreacion));
        }
        return s;})).toPromise();

      for (const mes of this.barChartLabels) {
        console.log(mes);
        console.log(MESES[mes]);
        console.log(saldos.filter(s=>s.fechaCreacion.getMonth() === MESES[mes]));
      }


    } catch (error) {
      this.errorMessages.push(error);
    }
  }
}
