import { Component, Input, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Telephely } from 'app/entities/telephely/telephely.model';
import { Megye } from 'app/entities/megye/megye.model';
import { Subscription } from 'rxjs';
import { ITEMS_PER_PAGE } from 'app/shared';
import { JhiAlertService, JhiEventManager } from 'ng-jhipster';
import { ActivatedRoute, Router } from '@angular/router';
import { EntityService } from '../../../../entity.service';
import { ToastrService } from 'ngx-toastr';
import { HttpResponse } from '@angular/common/http';

@Component({
    selector: 'jhi-table-builder',
    templateUrl: './table-builder.component.html'
})
export class TableBuilderComponent implements OnInit, OnDestroy {
    @Input() columns: any;
    @Input() url: string;
    queryParams: {};

    selected = [];
    megyeList: Megye[];
    megye: Megye;
    row = new Array<Telephely>();
    map = new Map();

    eventSubscriber: Subscription;
    @ViewChild('buttonTemplates') public buttonTemplates: TemplateRef<any>;

    itemsPerPage = ITEMS_PER_PAGE;
    totalItems = 0;
    pageNumber = 0;
    previousPage = 0;
    sortOptions: string[];
    items: any[] = [];

    constructor(
        private alertService: JhiAlertService,
        private router: Router,
        private entityService: EntityService,
        protected toasterService: ToastrService,
        private activatedRoute: ActivatedRoute,
        protected eventManager: JhiEventManager
    ) {
        this.megye = new Megye();
    }

    ngOnDestroy(): void {}

    ngOnInit(): void {
        this.loadAll();
        this.eventSubscriber = this.eventManager.subscribe('telephelyList-modification', response => this.loadAll());
    }

    loadAll() {
        this.entityService.getAll('api/megye').subscribe(counties => (this.megyeList = counties as Megye[]));

        this.columns.push({ cellTemplate: this.buttonTemplates });
        this.entityService
            .query('api/' + this.url, {
                page: this.pageNumber - 1,
                size: this.itemsPerPage,
                query: this.queryParams
            })
            .subscribe(
                (res: HttpResponse<any[]>) => {
                    this.items = res.body;
                    this.totalItems = Number(res.headers.get('X-Total-Count'));
                },
                () => {
                    this.toasterService.error('Nem sikerült betölteni a táblázat adatait');
                }
            );
    }

    loadPage(event: any, forceLoad = false) {
        if (event.offset !== this.previousPage || forceLoad) {
            this.previousPage = event.offset;
            this.pageNumber = event.offset + 1;
            this.loadAll();
        }
    }

    onSort(event) {
        this.sortOptions = event.sorts.map(s => `${this.map.get(s.prop)},${s.dir}`);
    }
}
