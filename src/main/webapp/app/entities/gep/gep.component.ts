import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { JhiAlertService, JhiDateUtils, JhiEventManager } from 'ng-jhipster';
import { EntityService } from '../../../entity.service';
import { Telephely } from 'app/entities/telephely/telephely.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { TableBuilderComponent } from 'app/entities/abstract/component/table-builder.component';
import { Gep } from 'app/entities/gep/gep.model';
import { GepTipus } from 'app/models/geptip.model';
import { Marka } from 'app/models/marka.model';

@Component({
    selector: 'jhi-gep',
    templateUrl: './gep.component.html'
})
export class GepComponent implements OnInit, OnDestroy {
    telephely: Telephely;
    gepTipus: GepTipus;
    marka: Marka;
    gep: Gep;
    mukodesKezdeteK = new Date();
    mukodesKezdeteV = new Date();
    telephelyId: number;
    geptipId: number;
    markaId: number;
    bsRangeValue: Date[];
    telephelyList: Telephely[];
    gepTipusList: GepTipus[];
    markaList: Marka[];
    row = new Array<Telephely>();
    columns = [];
    url = 'api/gep';
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
        this.gep = new Gep();
        this.telephely = new Telephely();
        this.gepTipus = new GepTipus();
        this.marka = new Marka();
        this.bsRangeValue = [new Date(), new Date()];
    }

    ngOnInit() {
        this.loadAll();

        this.columns = [
            { prop: 'nev', name: 'Név', sort: 'nev' },
            { prop: 'marka.nev', name: 'Márka', sort: 'marka.megyneveNev' },
            { prop: 'gepTipus.nev', name: 'Gép típusa', sort: 'gepTipus.nev' },
            { prop: 'telephely.nev', name: 'Település', sort: 'telephely.nev' },
            { prop: 'gyartasEve', name: 'Évjárat', sort: 'gyartasEve' },
            { prop: 'suly', name: 'Súly', sort: 'suly' }
        ];
    }

    loadAll() {
        this.entityService.getAll('api/geptip').subscribe(geptipusok => (this.gepTipusList = geptipusok as GepTipus[]));
        this.entityService.getAll('api/telephely').subscribe(telephelyek => (this.telephelyList = telephelyek as Telephely[]));
        this.entityService.getAll('api/marka').subscribe(markak => (this.markaList = markak as Marka[]));
    }

    public trackByFn(index, item) {
        return index;
    }

    ngOnDestroy() {}

    onDelete(id: number) {
        this.router.navigate(['gep', id, 'delete']);
    }

    mukodesDatumChange() {
        this.bsRangeValue[0].setDate(this.bsRangeValue[0].getDate() + 1);
        this.bsRangeValue[1].setDate(this.bsRangeValue[1].getDate() + 1);
    }

    markaChange() {
        this.markaId = this.gep.marka.id;
    }
    gepTipChange() {
        this.geptipId = this.gep.gepTipus.id;
    }
    telephelyChange() {
        this.telephelyId = this.gep.telephely.id;
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
            { searchFilter: 'telephelyId.equals', fieldValue: this.telephelyId },
            { searchFilter: 'markaId.equals', fieldValue: this.markaId },
            { searchFilter: 'geptipId.equals', fieldValue: this.geptipId },
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
        this.geptipId = null;
        this.markaId = null;
        this.telephelyId = null;
        this.gep.nev = null;
        this.bsRangeValue = [new Date(), new Date()];
        this.router.navigateByUrl('/gep');
        if (this.table) {
            this.table.queryParams = null;
            this.table.loadAll();
        }
    }
}
