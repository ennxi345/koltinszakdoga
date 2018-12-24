import { HttpParams } from '@angular/common/http';

export const createRequestOption = (req?: any): HttpParams => {
    let options: HttpParams = new HttpParams();
    if (req) {
        Object.keys(req).forEach(key => {
            if (key !== 'sort' && key !== 'query') {
                options = options.set(key, req[key]);
            }
        });
        if (req.sort) {
            req.sort.forEach(val => {
                options = options.append('sort', val);
            });
        }
        if (req.query) {
            const keys = Object.keys(req.query);

            keys.forEach(key => {
                options = options.append(key, req.query[key]);
            });
        }
    }
    return options;
};
