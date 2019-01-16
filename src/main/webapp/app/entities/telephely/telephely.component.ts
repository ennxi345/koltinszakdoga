import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { JhiAlertService, JhiDateUtils, JhiEventManager } from 'ng-jhipster';
import { EntityService } from '../../../entity.service';
import { Telephely } from 'app/entities/telephely/telephely.model';
import { Megye } from 'app/entities/megye/megye.model';
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
    mukodesKezdeteK = new Date();
    mukodesKezdeteV = new Date();
    megyeId: number;
    bsRangeValue: Date[];
    megyeList: Megye[];
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
        this.bsRangeValue = [new Date(), new Date()];
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
        this.entityService.getAll('api/megye').subscribe(counties => (this.megyeList = counties as Megye[]));
    }

    public trackByFn(index, item) {
        return index;
    }

    ngOnDestroy() {}

    onDelete(id: number) {
        this.router.navigate(['telephely', id, 'delete']);
    }

    megyeChange() {
        this.megyeId = this.telephely.megye.id;
    }

    mukodesDatumChange() {
        this.bsRangeValue[0].setDate(this.bsRangeValue[0].getDate() + 1);
        this.bsRangeValue[1].setDate(this.bsRangeValue[1].getDate() + 1);
    }

    onSearch() {
        if (this.bsRangeValue) {
            this.bsRangeValue[0].setDate(this.bsRangeValue[0].getDate() + 1);
            this.bsRangeValue[1].setDate(this.bsRangeValue[1].getDate() + 1);
        }

        this.queryParams = [
            { searchFilter: 'nev.contains', fieldValue: this.telephely.nev },
            {
                searchFilter: 'telepules.contains',
                fieldValue: this.telephely.telepules
            },
            { searchFilter: 'cim.contains', fieldValue: this.telephely.cim },
            { searchFilter: 'megyeId.equals', fieldValue: this.megyeId },
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
            this.bsRangeValue[0].setDate(this.bsRangeValue[0].getDate() - 1);
            this.bsRangeValue[1].setDate(this.bsRangeValue[1].getDate() - 1);
            this.table.loadAll();
        }
    }

    clearSearch() {
        this.megyeId = null;
        this.telephely.nev = null;
        this.telephely.telepules = null;
        this.telephely.cim = null;
        this.bsRangeValue = [new Date(), new Date()];
        this.router.navigateByUrl('/telephely');
        if (this.table) {
            this.table.queryParams = null;
            this.table.loadAll();
        }
    }
}
