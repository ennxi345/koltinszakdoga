import { Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { JhiAlertService, JhiEventManager, JhiTranslateComponent } from 'ng-jhipster';
import { EntityService } from '../../../entity.service';
import { Telephely } from 'app/entities/headquarter/telephely.model';
import { Megye } from 'app/entities/county/megye.model';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { TelephelyModalComponent } from 'app/entities/headquarter/telephely-modal.component';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { faAlignRight } from '@fortawesome/free-solid-svg-icons';
import { DeleteDialogComponent } from 'app/entities/abstract/component/delete-dialog.component';

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
    modalRef: BsModalRef;
    eventSubscriber: Subscription;
    @ViewChild('buttonTemplates') public buttonTemplates: TemplateRef<any>;

    constructor(
        private alertService: JhiAlertService,
        private router: Router,
        private entityService: EntityService,
        private modalService: BsModalService,
        protected toasterService: ToastrService,
        private activatedRoute: ActivatedRoute,
        protected eventManager: JhiEventManager
    ) {
        this.telephely = new Telephely();
        this.megye = new Megye();
    }

    ngOnInit() {
        this.loadAll();
        this.eventSubscriber = this.eventManager.subscribe('TelephelyList-modification', response => this.loadAll());
        this.columns = [
            { prop: 'nev', name: 'Név' },
            { prop: 'megye.megyeNev', name: 'Megye' },
            { prop: 'telepules', name: 'Település' },
            { prop: 'cim', name: 'Cím' },
            { prop: 'email', name: 'Email' },
            { prop: 'telefonszam', name: 'Telefonszám' },
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

    onEdit(row: Telephely) {
        const copy = Object.assign({}, row);
        const modal = this.modalService.show(TelephelyModalComponent);
        (<TelephelyModalComponent>modal.content).openConfirmDialog(copy);
    }

    onActivate(event) {}

    onSelect({ event }) {
        console.log(event, this.selected);
    }

    openConfirmDialog() {
        this.modalRef = this.modalService.show(TelephelyModalComponent);
    }

    onDelete(row: Telephely) {
        this.router.navigate(['telephely', row.id, 'delete']);
    }
}
