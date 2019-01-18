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
    mukodesKezdeteK: string;
    mukodesKezdeteV: string;
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
        this.bsRangeValue = null;
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

    mukodesDatumChange(event) {
        event[0].setDate(event[0].getDate() + 1);
        event[1].setDate(event[1].getDate() + 1);

        this.mukodesKezdeteK = new Date(event[0])
            .toISOString()
            .substring(0, 10)
            .split('T')[0];
        this.mukodesKezdeteV = new Date(event[1])
            .toISOString()
            .substring(0, 10)
            .split('T')[0];

        event[0].setDate(event[0].getDate() - 1);
        event[1].setDate(event[1].getDate() - 1);
    }

    markaChange() {
        if (this.gep.marka.id) {
            this.markaId = this.gep.marka.id;
        }
    }

    gepTipChange() {
        if (this.gep.gepTipus.id) {
            this.geptipId = this.gep.gepTipus.id;
        }
    }

    telephelyChange() {
        if (this.gep.telephely.id) {
            this.telephelyId = this.gep.telephely.id;
        }
    }

    onSearch() {
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
                fieldValue: this.mukodesKezdeteK
            },
            {
                searchFilter: 'mukodesKezdeteV.lessOrEqualThan',
                fieldValue: this.mukodesKezdeteV
            }
        ];
        if (this.table) {
            this.table.queryParams = this.queryParams;
            this.table.loadAll();
        }
    }

    clearSearch() {
        this.geptipId = null;
        this.markaId = null;
        this.telephelyId = null;
        this.gep.nev = null;
        this.bsRangeValue = null;
        this.router.navigateByUrl('/gep');
        if (this.table) {
            this.table.queryParams = null;
            this.table.loadAll();
        }
    }
}
