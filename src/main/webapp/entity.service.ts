import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { JhiAlertService } from 'ng-jhipster';
import { HttpClient, HttpResponse } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { createRequestOption } from 'app/shared';
import { PageResponse } from 'app/entities/abstract/component/page-response';
import { PageRequest } from 'app/entities/abstract/component/page-request';

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
        return this.http.get(`${url}`);
    }

    query(url: string, filter: PageRequest): Observable<PageResponse<any>> {
        const params = createRequestOption(filter);
        return this.http.get<PageResponse<any>>(`${url}/query`, { params });
    }

    delete(id: number, url: string) {
        return this.http.delete(`${url}/${id}`);
    }
}
