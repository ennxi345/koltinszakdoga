import { Telephely } from 'app/entities/telephely/telephely.model';
import { Beosztas } from 'app/entities/beosztas/beosztas.model';

export class Dolgozo {
    constructor(
        public id?: number,
        public vezetekNev?: string,
        public keresztkNev?: string,
        public beosztas?: Beosztas,
        public telephely?: Telephely,
        public lakhely?: string,
        public iranyitoSzam?: number,
        public cim?: string,
        public telefonSzam?: string,
        public fizetes?: number,
        public szulIdo?: Date,
        public munkaViszonyKezdete?: Date
    ) {}
}
