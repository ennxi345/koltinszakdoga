import { Marka } from 'app/models/marka.model';
import { GepTipus } from 'app/models/geptip.model';
import { Telephely } from 'app/entities/telephely/telephely.model';

export class Gep {
    constructor(
        public id?: number,
        public nev?: string,
        public marka?: Marka,
        public gepTipus?: GepTipus,
        public telephely?: Telephely,
        public suly?: number,
        public gyartas_eve?: number,
        public uzemIdo?: number,
        public cegTulajdona?: Date
    ) {}
}
