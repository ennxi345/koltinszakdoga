import { Component, OnDestroy, OnInit } from '@angular/core';
import { Telephely } from 'app/entities/headquarter/telephely.model';
import { Megye } from 'app/entities/county/megye.model';
import { JhiAlertService, JhiEventManager } from 'ng-jhipster';
import { EntityService } from '../../../entity.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef } from 'ngx-bootstrap';
import { entityRoute } from 'app/entities/entity.route';

@Component({
    selector: 'jhi-dialog-telephely',
    templateUrl: './telephely-modal.component.html'
})
export class TelephelyModalComponent implements OnInit, OnDestroy {
    telephely: Telephely;
    megyeList: Megye[];
    megye: Megye;
    url = 'api/telephely';

    constructor(
        private alertService: JhiAlertService,
        private entityService: EntityService,
        private route: ActivatedRoute,
        private modalRef: BsModalRef,
        protected eventManager: JhiEventManager
    ) {
        this.megye = new Megye();
        this.telephely = new Telephely();
    }

    ngOnDestroy(): void {}

    ngOnInit(): void {
        this.entityService.getAll('api/megye').subscribe(counties => (this.megyeList = counties as Megye[]));
    }

    save() {
        if (!this.telephely.id) {
            this.entityService
                .create(this.telephely, this.url)
                .subscribe(response => this.onSaveSuccess(response), response => this.onSaveError(response));
        } else {
            this.entityService
                .update(this.telephely, this.url)
                .subscribe(response => this.onSaveSuccess(response), response => this.onSaveError(response));
        }
    }

    public openConfirmDialog(entity: Telephely): void {
        if (entity) {
            this.telephely = entity;
        }
    }

    cancel() {
        this.modalRef.hide();
    }

    onSaveSuccess(response: any) {
        this.modalRef.hide();
        this.eventManager.broadcast({
            name: 'telephelyList-modification',
            content: 'OK'
        });

        this.alertService.success('Sikeres mentés');
    }

    onSaveError(response: any) {
        this.alertService.error('Sikertelen mentés!');
    }
}
