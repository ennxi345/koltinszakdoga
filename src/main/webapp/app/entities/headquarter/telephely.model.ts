import { Megye } from 'app/entities/county/megye.model';

export class Telephely {
    constructor(
        public id?: number,
        public megye?: Megye,
        public telepules?: string,
        public iranyitoSzam?: string,
        public cim?: string,
        public telefonSzam?: string,
        public email?: string,
        public fax?: string,
        public mukodesKezdete?: Date
    ) {}
}
