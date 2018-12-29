import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { JhiAlertService, JhiDateUtils, JhiEventManager } from 'ng-jhipster';
import { EntityService } from '../../../entity.service';
import { Telephely } from 'app/entities/headquarter/telephely.model';
import { Megye } from 'app/entities/county/megye.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { TableBuilderComponent } from 'app/entities/abstract/component/table-builder.component';

@Component({
    selector: 'jhi-telephely',
    templateUrl: './telephely.component.html'
})
export class TelephelyComponent implements OnInit, OnDestroy {
    telephely: Telephely;
    mukodesKezdeteK: Date;
    mukodesKezdeteV: Date;
    bsRangeValue: Date[];
    maxDate = new Date();
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
        protected eventManager: JhiEventManager,
        protected dateHelper: JhiDateUtils
    ) {
        this.telephely = new Telephely();
        this.megye = new Megye();
        this.telephely.nev = '';
        this.telephely.telepules = '';
        this.telephely.cim = '';
    }

    ngOnInit() {
        this.loadAll();

        this.columns = [
            { prop: 'nev', name: 'Név', sort: 'nev' },
            { prop: 'megye.megyeNev', name: 'Megye', sort: 'megye.megyeNev' },
            { prop: 'telepules', name: 'Település', sort: 'telepules' },
            { prop: 'cim', name: 'Cím' },
            { prop: 'mukodesKezdete', name: 'Működés kezdete' }
        ];
    }

    loadAll() {
        this.telephely.nev = '';
        this.telephely.telepules = '';
        this.telephely.cim = '';
        this.entityService.getAll('api/megye').subscribe(counties => (this.megyeList = counties as Megye[]));
    }

    public trackByFn(index, item) {
        return index;
    }

    ngOnDestroy() {}

    onDelete(id: number) {
        this.router.navigate(['telephely', id, 'delete']);
    }

    onSearch() {
        this.queryParams = [
            { searchFilter: 'nev.contains', fieldValue: this.telephely.nev },
            { searchFilter: 'telepules.contains', fieldValue: this.telephely.telepules },
            { searchFilter: 'cim.contains', fieldValue: this.telephely.cim },
            {
                searchFilter: 'mukodesKezdeteK.greaterOrEqualThan',
                fieldValue: new Date(this.bsRangeValue[0])
                    .toISOString()
                    .substring(0, 10)
                    .split('T')[0]
            },
            {
                searchFilter: 'mukodesKezdeteV.lessOrEqualThan',
                fieldValue: new Date(this.bsRangeValue[1])
                    .toISOString()
                    .substring(0, 10)
                    .split('T')[0]
            }
        ];
        if (this.table) {
            this.table.queryParams = this.queryParams;
            this.table.loadAll();
        }
    }

    clearSearch() {
        this.router.navigateByUrl('/telephely');
        if (this.table) {
            this.table.queryParams = null;
            this.table.loadAll();
        }
    }
}
