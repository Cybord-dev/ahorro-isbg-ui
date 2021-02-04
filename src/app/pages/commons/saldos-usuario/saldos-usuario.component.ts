import { Component, OnInit } from '@angular/core';
import { AhorroServicio } from '../../../services/ahorro.service';
import { UsuariosService } from '../../../services/usuarios.service';
import { SaldoAhorro } from '../../../models/saldoahorro';
import { SaldoPrestamo } from '../../../models/saldoprestamo';
import { Meses } from 'src/app/models/meses';
import { map } from 'rxjs/operators';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'cybord-saldos-usuario',
  templateUrl: './saldos-usuario.component.html',
  styleUrls: ['./saldos-usuario.component.scss']
})
export class SaldosUsuarioComponent implements OnInit {


  public loading = false;
  public total: number;
  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels: string[] = ['NOVIEMBRE', 'DICIEMBRE', 'ENERO', 'FEBRERO', 'MARZO', 'ABRIL', 'MAYO', 'JUNIO', 'JULIO', 'AGOSTO', 'SEPTIEMBRE', 'OCTUBRE'];
  public COLORS = ['#46BFBD', '#46BFBD', '#46BFBD', '#46BFBD', '#46BFBD', '#46BFBD', '#46BFBD', '#46BFBD', '#46BFBD', '#46BFBD', '#46BFBD', '#46BFBD'];
  public alerts: string[] = [];

  public barChartData: any[] = [{ data: [], label: 'Ahorro acumulado' }];
  public barChartDataPrestamos: any[] = [{ data: [], label: 'Prestamo acumulado' }];
  public ahorros: SaldoAhorro[] = [];
  public prestamos: SaldoAhorro[] = [];
  constructor(
    private userService: UsuariosService,
    private datepipe: DatePipe,
    private route: ActivatedRoute,
    private saldosAhorro: AhorroServicio) {

  }

  ngOnInit(): void {
    this.loading = true;
    this.route.paramMap.subscribe(route => {
      const id = route.get('idUsuario');
      console.log('Loading saldos usuario from user,', id);
      if (id == null || id == undefined) {
        this.userService.myInfo()
          .then((user) => {
            this.setInfoAhorros(user.id);
          })
          .catch(error => this.alerts.push(error))
          .then(() => this.loading = false);
      } else {
        this.setInfoAhorros(+id);
        this.loading = false;
      }
    });
  }

  private async setInfoAhorros(userId: number): Promise<void> {
    try {
      const MESES: Meses = new Meses();
      this.ahorros = await this.saldosAhorro.getSaldoByUsuario(userId)
        .pipe(map((saldos: SaldoAhorro[]) => {
          for (const s of saldos) {
            s.fechaCreacion = new Date(s.fechaCreacion);
          }
          return saldos;
        })).toPromise();
      const data = [];
      let acumulado = 0;
      for (const mes of this.barChartLabels) {
        const montos: number[] = this.ahorros.filter(s => s.fechaCreacion.getMonth() === MESES[mes]).map(s => s.monto);
        if (montos.length > 0) {
          acumulado = acumulado + montos.reduce((a, b) => a + b);
          data.push(acumulado);
        } else {
          data.push(acumulado);
        }
      }
      this.total = acumulado;
      this.barChartData = [{ data, backgroundColor: this.COLORS, label: 'Ahorro acumulado' }];
    } catch (error) {
      this.alerts.push(error);
    }
  }

  private async setInfoPrestamoms(userId: number): Promise<void> {
    try {
      const MESES: Meses = new Meses();
      this.prestamos = await this.saldosAhorro.getSaldoByUsuario(userId)
        .pipe(map((prestamos: SaldoAhorro[]) => {
          for (const s of prestamos) {
            s.fechaCreacion = new Date(s.fechaCreacion);
          }
          return prestamos;
        })).toPromise();
      const data = [];
      let acumulado = 0;
      for (const mes of this.barChartLabels) {
        const montos: number[] = this.ahorros.filter(s => s.fechaCreacion.getMonth() === MESES[mes]).map(s => s.monto);
        if (montos.length > 0) {
          acumulado = acumulado + montos.reduce((a, b) => a + b);
          data.push(acumulado);
        } else {
          data.push(acumulado);
        }
      }
      this.total = acumulado;
      this.barChartDataPrestamos = [{ data, backgroundColor: this.COLORS, label: 'Prestamom acumulado' }];
    } catch (error) {
      this.alerts.push(error);
    }
  }
}
