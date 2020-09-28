import { RolCat } from './rolcat';
export class Rol {

    public id: number;
    public rolname: RolCat;

    constructor( role: number) {
        this.rolname = new RolCat();
    }
}