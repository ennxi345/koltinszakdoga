import { Megye } from 'app/models/megye.model';

export class Telephely {
    constructor(
        public id?: number,
        public nev?: string,
        public megye?: Megye,
        public megyeId?: number,
        public telepules?: string,
        public iranyitoSzam?: string,
        public cim?: string,
        public telefonSzam?: string,
        public email?: string,
        public fax?: string,
        public mukodesKezdete?: Date
    ) {}
}
