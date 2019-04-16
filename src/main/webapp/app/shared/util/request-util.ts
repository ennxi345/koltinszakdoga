import { HttpParams } from '@angular/common/http';

export const createRequestOption = (req?: any): HttpParams => {
    let options: HttpParams = new HttpParams();
    if (req) {
        Object.keys(req).forEach(key => {
            if (key !== 'sort' && key !== 'filter') {
                options = options.set(key, req[key]);
            }
        });
        if (req.sort) {
            req.sort.forEach(val => {
                options = options.append('sort', val);
            });
        }

        if (req.filter) {
            const keys = Object.keys(req.filter);

            keys.forEach(key => {
                if (req.filter[key] !== undefined && req.filter[key] !== null) {
                    options = options.append(key, req.filter[key]);
                }
            });
        }
    }
    return options;
};
