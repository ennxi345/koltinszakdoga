import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { JhiAlertService, JhiDateUtils, JhiEventManager } from 'ng-jhipster';
import { EntityService } from '../../../entity.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { TableBuilderComponent } from 'app/entities/abstract/component/table-builder.component';
import { Dolgozo } from 'app/entities/dolgozo/dolgozo.model';
import { Beosztas } from 'app/models/beosztas.model';
import { Telephely } from 'app/entities/telephely/telephely.model';

@Component({
    selector: 'jhi-dolgozo',
    templateUrl: './dolgozo.component.html'
})
export class DolgozoComponent implements OnInit, OnDestroy {
    dolgozo: Dolgozo;
    telephelyId: number;
    beosztasId: number;
    bsRangeValue: Date[];
    telephelyek: Telephely[];
    beosztasok: Beosztas[];
    row = new Array<Telephely>();
    columns = [];
    url = 'api/telephely';
    eventSubscriber: Subscription;

    munkaViszonyKezdeteK: string;
    munkaViszonyKezdeteV: string;

    @ViewChild('table') table: TableBuilderComponent;
    queryParams: any;

    constructor(
        private alertService: JhiAlertService,
        private router: Router,
        private entityService: EntityService,
        protected toasterService: ToastrService,
        private activatedRoute: ActivatedRoute,
        protected eventManager: JhiEventManager,
        protected dateHelper: JhiDateUtils
    ) {
        this.dolgozo = new Dolgozo();
    }

    ngOnInit() {
        this.loadAll();

        this.columns = [
            { prop: 'vezetekNev', name: 'Vezetéknév', sort: 'vezetekNev' },
            { prop: 'keresztkNev', name: 'Keresztnév', sort: 'keresztkNev' },
            { prop: 'beosztas.beosztasNev', name: 'Beosztás', sort: 'beosztas.beosztasNev' },
            { prop: 'telephely.nev', name: 'Telephely', sort: 'telephely.nev' },
            { prop: 'szulIdo', name: 'Születési dátum' },
            { prop: 'munkaViszonyKezdete', name: 'Munkaviszony kezdete' }
        ];
    }

    loadAll() {
        this.entityService.getAll('api/telephely').subscribe(telephelyek => (this.telephelyek = telephelyek as Telephely[]));
        this.entityService.getAll('api/beosztas').subscribe(beosztasok => (this.beosztasok = beosztasok as Beosztas[]));
    }

    public trackByFn(index, item) {
        return index;
    }

    ngOnDestroy() {}

    onDelete(id: number) {
        this.router.navigate(['dolgozo', id, 'delete']);
    }

    telepulesChange() {
        if (this.dolgozo.telephely.id) {
            this.telephelyId = this.dolgozo.telephely.id;
        }
    }

    beosztasChange() {
        if (this.dolgozo.beosztas.id) {
            this.beosztasId = this.dolgozo.beosztas.id;
        }
    }

    munkaviszonyDateChange(event) {
        event[0].setDate(event[0].getDate() + 1);
        event[1].setDate(event[1].getDate() + 1);

        this.munkaViszonyKezdeteK = new Date(event[0])
            .toISOString()
            .substring(0, 10)
            .split('T')[0];
        this.munkaViszonyKezdeteV = new Date(event[1])
            .toISOString()
            .substring(0, 10)
            .split('T')[0];

        event[0].setDate(event[0].getDate() - 1);
        event[1].setDate(event[1].getDate() - 1);
    }

    onSearch() {
        this.queryParams = [
            { searchFilter: 'vezetekNev.contains', fieldValue: this.dolgozo.vezetekNev },
            {
                searchFilter: 'keresztkNev.contains',
                fieldValue: this.dolgozo.keresztkNev
            },
            { searchFilter: 'telephelyId.equals', fieldValue: this.telephelyId },
            { searchFilter: 'beosztasId.equals', fieldValue: this.beosztasId },
            {
                searchFilter: 'munkaViszonyKezdeteK.greaterOrEqualThan',
                fieldValue: this.munkaViszonyKezdeteK
            },
            {
                searchFilter: 'munkaViszonyKezdeteV.lessOrEqualThan',
                fieldValue: this.munkaViszonyKezdeteV
            }
        ];
        if (this.table) {
            this.table.queryParams = this.queryParams;
            this.table.loadAll();
        }
    }

    clearSearch() {
        this.dolgozo.vezetekNev = null;
        this.dolgozo.keresztkNev = null;
        this.beosztasId = null;
        this.telephelyId = null;
        this.bsRangeValue = null;
        this.router.navigateByUrl('/dolgozo');
        if (this.table) {
            this.table.queryParams = null;
            this.table.loadAll();
        }
    }
}
