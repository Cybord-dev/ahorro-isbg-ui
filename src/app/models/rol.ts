import { RolCat } from './rolcat';
export class Rol {

    public id: number;
    public idUsuario: number;
    public idRol: number;
    public rolcat: RolCat;

    constructor() {
        this.rolcat = new RolCat();
    }
}