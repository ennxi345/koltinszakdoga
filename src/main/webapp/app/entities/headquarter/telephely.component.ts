import { Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { JhiAlertService, JhiEventManager } from 'ng-jhipster';
import { EntityService } from '../../../entity.service';
import { Telephely } from 'app/entities/headquarter/telephely.model';
import { Megye } from 'app/entities/county/megye.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

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
    columns = [];
    url = 'api/telephely';
    eventSubscriber: Subscription;
    @ViewChild('buttonTemplates') public buttonTemplates: TemplateRef<any>;

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
        this.eventSubscriber = this.eventManager.subscribe('telephelyList-modification', response => this.loadAll());
        this.columns = [
            { prop: 'nev', name: 'Név' },
            { prop: 'megye.megyeNev', name: 'Megye' },
            { prop: 'telepules', name: 'Település' },
            { prop: 'cim', name: 'Cím' },
            { prop: 'email', name: 'Email' },
            { prop: 'telefonSzam', name: 'Telefonszám' },
            { prop: 'fax', name: 'Fax' },
            { prop: 'mukodesKezdete', name: 'Működés kezdete' },
            { cellTemplate: this.buttonTemplates }
        ];
    }

    loadAll() {
        this.entityService.getAll('api/megye').subscribe(counties => (this.megyeList = counties as Megye[]));
        this.entityService.getAll(this.url).subscribe(headquarters => (this.telephelyList = headquarters as Telephely[]));
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
}
