export class datusDummyTramite {
    idusuario:number;
    estado: number;
    fechaInicio: Date;
    fechaModificacion: Date;
    Fechaefectivareintegro: Date;
    Motivodecancelacion: string;
    ceuntaDeposito:string;

    constructor (){
      this.idusuario = 0;
          this.estado= 0; 
          this.fechaInicio= undefined;
          this.fechaModificacion= undefined;
          this.Fechaefectivareintegro= undefined;
          this.Motivodecancelacion= '';
          this.ceuntaDeposito='';
    }
  }