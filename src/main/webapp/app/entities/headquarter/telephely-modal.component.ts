import { Component, OnDestroy, OnInit } from '@angular/core';
import { Telephely } from 'app/entities/headquarter/telephely.model';
import { Megye } from 'app/entities/county/megye.model';
import { JhiAlertService, JhiEventManager } from 'ng-jhipster';
import { EntityService } from '../../../entity.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef } from 'ngx-bootstrap';
import { entityRoute } from 'app/entities/entity.route';
import { PopupComponent } from 'app/entities/abstract/service/popup.component';
import { DeleteDialogComponent } from 'app/entities/abstract/component/delete-dialog.component';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'jhi-telephely-modal',
    templateUrl: './telephely-modal.component.html'
})
export class TelephelyModalComponent implements OnInit, OnDestroy {
    telephely: Telephely;
    megyeList: Megye[];
    megye: Megye;
    url = '';
    entity = new Telephely();

    constructor(
        private alertService: JhiAlertService,
        private entityService: EntityService,
        private route: ActivatedRoute,
        private toasterService: ToastrService,
        public activeModal: NgbActiveModal,
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
        if (!this.entity.id) {
            this.entityService
                .create(this.entity, this.url)
                .subscribe(response => this.onSaveSuccess(response), response => this.onSaveError(response));
        } else {
            this.entityService
                .update(this.entity, this.url)
                .subscribe(response => this.onSaveSuccess(response), response => this.onSaveError(response));
        }
    }

    cancel() {
        this.activeModal.dismiss(true);
    }

    onSaveSuccess(response: any) {
        this.activeModal.dismiss(true);
        this.eventManager.broadcast({
            name: 'telephelyList-modification',
            content: 'OK'
        });

        this.toasterService.success('Sikeres mentés');
    }

    onSaveError(response: any) {
        this.alertService.error('Sikertelen mentés!');
    }
}

@Component({
    selector: 'jhi-telephely-modal-popup',
    template: ''
})
export class TelephelyModalPopupComponent implements OnInit, OnDestroy {
    routeSub: any;

    constructor(private route: ActivatedRoute, private popupService: PopupComponent) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.popupService.open(TelephelyModalComponent as Component, params['id'], params['entity']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
