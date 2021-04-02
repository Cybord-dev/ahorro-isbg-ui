import { Component, OnInit, ViewChild } from '@angular/core';
import { PrestamosService } from 'src/app/services/prestamos.service';
import { Prestamo } from 'src/app/models/prestamo';
import { SaldoPrestamo } from 'src/app/models/saldoprestamo';
import { UsuariosService } from '../../../services/usuarios.service';
import { ModalDirective } from 'ngx-bootstrap/modal/public_api';
import { Usuario } from 'src/app/models/usuario';
import { ValidationService } from 'src/app/services/validation.service';
import { RecursoService } from 'src/app/services/recurso.service';
import { Recurso } from 'src/app/models/recurso';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'cybord-prestamos-usuario',
  templateUrl: './prestamo-usuario.component.html',
  styleUrls: ['./prestamo-usuario.component.scss']
})
export class PrestamoUsuarioComponent implements OnInit {

  @ViewChild('modalConfirmacion') public modalConfirmacion: ModalDirective;

  public loading = false;
  public prestamos: Prestamo[] = [];
  public total: number = 0;
  public totalPagado: number = 0;
  private usuario: Usuario;
  public montos: any[] = [];
  public alerts: string[] = [];

  public noEmpleado: string = '';
  public idUsuarioPrestamo: number = 0;
  public prestamo: Prestamo = new Prestamo();
  public fileName: string = '';
  public fileInput: any;
  public imgPago: Recurso = new Recurso('IMAGEN', 'PRESTAMO');
  public pago: SaldoPrestamo = new SaldoPrestamo();

  public chartData = new Map();
  public barChartLabels: string[] = [];
  public barChartData: any[] = [{ data: [], label: 'Deuda prestamos' }];
  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true,
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    }
  };



  constructor(
    private prestamoService: PrestamosService,
    private userService: UsuariosService,
    private validationService: ValidationService,
    private fileService: RecursoService,
    private route: ActivatedRoute,
  ) { }


  ngOnInit(): void {
    this.loading = true;

    this.userService.myInfo()
      .then((user) => {
        this.usuario = user;
      })
      .catch(error => this.alerts.push(error))
      .then(() => {
        this.route.paramMap.subscribe(route => {
          const id = route.get('idUsuario');
          console.log('Loading saldos usuario from user,', id);
          if (id == null || id == undefined) {
            this.idUsuarioPrestamo = this.usuario.id; 
            this.loadPrestamosInfo(this.idUsuarioPrestamo);
          } else {
            this.idUsuarioPrestamo = +id;
            this.loadPrestamosInfo(this.idUsuarioPrestamo);
          }
        });
      });
  }


  public async loadPrestamosInfo(idUser: number) {
    this.alerts = [];
    try {
      let allDebts: Prestamo[] = await this.prestamoService.getPrestamosByUsuario(idUser).toPromise();
      this.prestamos = allDebts.filter(p => p.estatus.indexOf('TERMINADO') < 0);
      if (this.prestamos !== undefined && this.prestamos.length > 0) {
        this.total = this.prestamos.map(p => p.saldoPendiente).reduce((a, b) => a + b);
      }
      this.setCharData(this.prestamos);
      this.loading = false;
    } catch (error) {
      this.alerts.push(error);
      this.loading = false;
    }
  }

  private dateConverter(fecha: string): Date {
    let a = fecha.split("-");
    return new Date(Number(a[0]), Number(a[1]) - 1, Number(a[2]));
  }
  public cerrar(): void {
    this.modalConfirmacion.hide();
  }


  private getYearAndMonth(fecha: Date): string {
    let temp = new Date(fecha);
    return temp.getFullYear() + "-" + (temp.getMonth() + 1);
  }

  private setMontoCharData(key: string, monto: number) {

    let data: number[] = this.chartData.get(key);

    if (data === undefined || data === null) {
      data = [];
      data.push(monto);
      this.chartData.set(key, data);
    } else {
      data.push(monto);
      this.chartData.set(key, data);
    }
  }


  private setCharData(prestamos: Prestamo[]) {

    prestamos.forEach(e => {
      let anioMes: string = this.getYearAndMonth(this.dateConverter(e.fechaCreacion.toString()));
      this.setMontoCharData(anioMes, e.monto);
      e.saldosPrestamo
        .filter(m => m.tipo !== 'INTERES')
        .forEach(m => {
          let k = this.getYearAndMonth(this.dateConverter(m.fechaCreacion.toString()));
          this.setMontoCharData(k, -1 * m.monto);
        });
      let labels: string[] = [];
      for (const key of this.chartData.keys()) {
        labels.push(key);
      }
      // ordena de menos a mayor
      labels.sort();
      this.barChartLabels = labels;
      // hacer un for de labels, y recuperar con el año mes el monto del prestamo
      let data = [];
      let acumulado = 0;
      labels.forEach(mes => {
        acumulado += this.chartData.get(mes).reduce((a, b) => a + b);
        data.push(acumulado);
      });
      this.barChartData = [{ data: data, backgroundColor: "#46BFBD", label: 'Deuda prestamos' }];
    });
  }

  fileUploadListener(event: any): void {
    this.alerts = [];
    this.fileInput = event.target;
    const reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      if (file.size > 1000000) {
        alert('El archivo demasiado grande, intenta con un archivo mas pequeño.');
      } else {
        reader.readAsDataURL(file);
        reader.onload = () => {
          this.fileName = file.name;
          this.imgPago.dato = reader.result.toString();
        };
        reader.onerror = (error) => { this.alerts.push('Error parsing image file'); };
      }
    }
  }

  public async sendPayment() {
    this.pago.idPrestamo = this.prestamo.id;
    this.pago.tipo = 'PAGO';
    this.pago.validado = 'EN_VALIDACION';
    this.pago.origen = this.usuario.email;
    try {
      this.alerts = this.validationService.validateSaldoPrestamo(this.pago, this.prestamo);
      if (this.alerts.length == 0) {
        this.pago = await this.prestamoService.insertSaldoPrestamo(this.prestamo.id, this.pago).toPromise();
        this.imgPago.referencia = this.pago.id.toString();
        let img = await this.fileService.insertResourceFile(this.imgPago).toPromise();
        console.log(`${this.fileName} has been laoded`, img);
        this.modalConfirmacion.hide();
        this.noEmpleado = '';
        this.loadPrestamosInfo(this.idUsuarioPrestamo);
      }
    } catch (error) {
      this.pago = new SaldoPrestamo();
      this.imgPago = new Recurso('IMAGEN', 'PRESTAMO');
      this.fileName = '';
      this.noEmpleado = '';
      this.alerts.push(error);
    }
    this.loading = false;
  }

  public openModal(prestamo: Prestamo): void {
    this.alerts = [];
    this.imgPago = new Recurso('IMAGEN', 'PRESTAMO');
    this.fileName = '';
    this.noEmpleado = '';
    this.pago = new SaldoPrestamo();

    this.imgPago.dato = undefined;
    this.prestamo = prestamo;
    if(prestamo.saldosPrestamo.filter(p => p.tipo !== 'INTERES') !== undefined && prestamo.saldosPrestamo.filter(p => p.tipo !== 'INTERES').length > 0){
      this.totalPagado = prestamo.saldosPrestamo.filter(p => p.tipo !== 'INTERES').map(p => p.monto).reduce((a, b) => a + b);
    } else {
      this.totalPagado = 0;
    }
    
    this.pago.monto = prestamo.monto - this.totalPagado;
    this.modalConfirmacion.show();
  }

  public closeModal(): void {
    this.pago = new SaldoPrestamo();
    this.imgPago = new Recurso('IMAGEN', 'PRESTAMO');
    this.fileName = '';
    this.noEmpleado = '';
    this.prestamo = new Prestamo();

    if (this.fileInput !== undefined) {
      this.fileInput.value = '';
    }
    this.modalConfirmacion.hide();
  }
}
