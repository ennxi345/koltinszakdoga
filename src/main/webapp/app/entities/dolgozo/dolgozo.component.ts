import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { JhiAlertService, JhiDateUtils, JhiEventManager } from 'ng-jhipster';
import { EntityService } from '../../../entity.service';
import { Megye } from 'app/entities/megye/megye.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { TableBuilderComponent } from 'app/entities/abstract/component/table-builder.component';
import { Dolgozo } from 'app/entities/dolgozo/dolgozo.model';
import { Beosztas } from 'app/entities/beosztas/beosztas.model';
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
            { prop: 'telephely.nev', name: 'Beosztás', sort: 'telephely.nev' },
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
        this.telephelyId = this.dolgozo.telephely.id;
    }
    beosztasChange() {
        this.beosztasId = this.dolgozo.beosztas.id;
    }

    mukodesDatumChange() {
        this.bsRangeValue[0].setDate(this.bsRangeValue[0].getDate() + 1);
        this.bsRangeValue[1].setDate(this.bsRangeValue[1].getDate() + 1);
    }

    clearSearch() {
        this.router.navigateByUrl('/dolgozo');
        if (this.table) {
            this.table.queryParams = null;
            this.table.loadAll();
        }
    }
}
