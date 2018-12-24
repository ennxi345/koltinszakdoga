import { Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { JhiAlertService, JhiEventManager } from 'ng-jhipster';
import { EntityService } from '../../../entity.service';
import { Telephely } from 'app/entities/headquarter/telephely.model';
import { Megye } from 'app/entities/county/megye.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Page } from 'app/models/page.model';
import { HttpResponse } from '@angular/common/http';
import { ITEMS_PER_PAGE } from 'app/shared';
import { TableBuilderComponent } from 'app/entities/abstract/component/table-builder.component';

@Component({
    selector: 'jhi-telephely',
    templateUrl: './telephely.component.html'
})
export class TelephelyComponent implements OnInit, OnDestroy {
    telephely: Telephely;
    selected = [];
    telephelyList: Telephely[];
    megyeList: Megye[];
    megye: Megye;
    row = new Array<Telephely>();
    columns = [];
    url = 'api/telephely';
    eventSubscriber: Subscription;

    @ViewChild('table') table: TableBuilderComponent;
    queryParams: any;

    constructor(
        private alertService: JhiAlertService,
        private router: Router,
        private entityService: EntityService,
        protected toasterService: ToastrService,
        private activatedRoute: ActivatedRoute,
        protected eventManager: JhiEventManager
    ) {
        this.telephely = new Telephely();
        this.megye = new Megye();
    }

    ngOnInit() {
        this.loadAll();

        this.columns = [
            { prop: 'nev', name: 'Név', sort: 'nev' },
            { prop: 'megye.megyeNev', name: 'Megye', sort: 'megye.megyeNev' },
            { prop: 'telepules', name: 'Település', sort: 'telepules' },
            { prop: 'cim', name: 'Cím' },
            { prop: 'email', name: 'Email' },
            { prop: 'telefonSzam', name: 'Telefonszám' },
            { prop: 'fax', name: 'Fax' },
            { prop: 'mukodesKezdete', name: 'Működés kezdete' }
        ];
    }

    loadAll() {
        this.entityService.getAll('api/megye').subscribe(counties => (this.megyeList = counties as Megye[]));
        this.entityService.getAll(this.url).subscribe(telephelys => (this.telephelyList = telephelys as Telephely[]));
    }

    public trackByFn(index, item) {
        return index;
    }

    ngOnDestroy() {}

    findCounty(countyId: number) {
        return this.megyeList.find(x => x.id === countyId);
    }

    onSelect({ event }) {
        console.log(event, this.selected);
    }

    onDelete(id: number) {
        this.router.navigate(['telephely', id, 'delete']);
    }

    onSearch() {
        this.queryParams = { 'nev.contains': this.telephely.nev };
        if (this.table) {
            this.table.queryParams = this.queryParams;
            this.table.loadAll();
        }
    }

    clearSearch() {
        this.router.navigateByUrl('/telephely');
    }
}
