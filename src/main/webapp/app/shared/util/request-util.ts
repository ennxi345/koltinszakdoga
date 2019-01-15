import { HttpParams } from '@angular/common/http';

export const createRequestOption = (req?: any): HttpParams => {
    let options: HttpParams = new HttpParams();
    if (req) {
        Object.keys(req).forEach(key => {
            if (key !== 'sort' && key !== 'query' && key !== 'telepules') {
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

            Object.keys(req.query).forEach(key => {
                if (req.query[key].fieldValue) {
                    options = options.append(req.query[key].searchFilter, req.query[key].fieldValue);
                }
            });
        }
    }
    return options;
};
