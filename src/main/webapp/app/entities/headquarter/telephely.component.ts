import { Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { JhiAlertService, JhiEventManager, JhiTranslateComponent } from 'ng-jhipster';
import { EntityService } from '../../../entity.service';
import { Telephely } from 'app/entities/headquarter/telephely.model';
import { Megye } from 'app/entities/county/megye.model';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { TelephelyModalComponent } from 'app/entities/headquarter/telephely-modal.component';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { faAlignRight } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'telephely',
    templateUrl: './telephely.component.html'
})
export class TelephelyComponent implements OnInit, OnDestroy {
    telephely: Telephely;
    telephelyList: Telephely[];
    megyeList: Megye[];
    megye: Megye;
    url = 'api/telephely';
    modalRef: BsModalRef;
    eventSubscriber: Subscription;

    columns = [{ prop: 'megye.megyeNev', name: 'megye' }, { name: 'address' }, { name: 'email' }, { name: 'telepules' }];

    constructor(
        private alertService: JhiAlertService,
        private router: Router,
        private entityService: EntityService,
        private modalService: BsModalService,
        protected toasterService: ToastrService,
        protected eventManager: JhiEventManager
    ) {
        this.telephely = new Telephely();
        this.megye = new Megye();
    }

    ngOnInit() {
        this.loadAll();
        this.eventSubscriber = this.eventManager.subscribe('HeadquarterList-modification', response => this.loadAll());
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

    onEdit(headquarter: Telephely) {
        const copy = Object.assign({}, headquarter);
        const modal = this.modalService.show(TelephelyModalComponent);
        (<TelephelyModalComponent>modal.content).openConfirmDialog(copy);
    }

    openConfirmDialog() {
        this.modalRef = this.modalService.show(TelephelyModalComponent);
    }

    onDelete(id: number) {
        this.entityService.delete(id, this.url).subscribe(response =>
            this.eventManager.broadcast({
                name: 'HeadquarterList-modification',
                content: 'Deleted headquarters'
            })
        );
        this.toasterService.success('Sikeres törlés', null);
    }
}
