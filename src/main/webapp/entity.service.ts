import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { JhiAlertService } from 'ng-jhipster';
import { HttpClient, HttpResponse } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Page } from 'app/models/page.model';
import { RequestOptions } from 'http';
import { createRequestOption } from 'app/shared';

@Injectable()
export class EntityService {
    constructor(private http: HttpClient, private alertService: JhiAlertService) {}

    create(entity: any, url: string): Observable<any> {
        const copy = entity;
        return this.http.post(url, copy).map((res: Response) => {
            return res;
        });
    }

    update(entity: any, url: string): Observable<any> {
        const copy = entity;
        return this.http.put(url, copy).map((res: Response) => {
            return res;
        });
    }

    find(id: number, url: string): Observable<any> {
        return this.http.get(`${url}/${id}`);
    }

    getAll(url: string): Observable<any> {
        return this.http.get(`${url}/all`);
    }

    query(url: string, filter: any): Observable<HttpResponse<any>> {
        const options = createRequestOption(filter);
        return this.http.get(`${url}/query`, { params: options, observe: 'response' });
    }

    delete(id: number, url: string) {
        return this.http.delete(`${url}/${id}`);
    }
}
