import { County } from 'app/entities/county/county.model';

export class Headquarter {
    constructor(
        public id?: number,
        public countyId?: number,
        public settlement?: string,
        public zipCode?: string,
        public address?: string,
        public phoneNumber?: string,
        public email?: string
    ) {}
}
