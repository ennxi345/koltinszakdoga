import { Component, OnDestroy, OnInit } from '@angular/core';
import { Telephely } from 'app/entities/telephely/telephely.model';
import { JhiAlertService, JhiEventManager } from 'ng-jhipster';
import { EntityService } from '../../../entity.service';
import { ActivatedRoute } from '@angular/router';
import { PopupComponent } from 'app/entities/abstract/service/popup.component';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { GepTipus } from 'app/models/geptip.model';
import { Marka } from 'app/models/marka.model';
import { Gep } from 'app/entities/gep/gep.model';

@Component({
    selector: 'jhi-gep-modal',
    templateUrl: './gep-modal.component.html'
})
export class GepModalComponent implements OnInit, OnDestroy {
    telephely: Telephely;
    gepTipus: GepTipus;
    marka: Marka;
    gep: Gep;
    telephelyList: Telephely[];
    gepTipusList: GepTipus[];
    markaList: Marka[];
    url = '';
    entity = new Gep();

    constructor(
        private alertService: JhiAlertService,
        private entityService: EntityService,
        private route: ActivatedRoute,
        private toasterService: ToastrService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {
        this.gep = new Gep();
        this.telephely = new Telephely();
        this.gepTipus = new GepTipus();
        this.marka = new Marka();
    }

    ngOnDestroy(): void {}

    ngOnInit(): void {
        this.entityService.getAll('api/geptip').subscribe(geptipusok => (this.gepTipusList = geptipusok as GepTipus[]));
        this.entityService.getAll('api/telephely').subscribe(telephelyek => (this.telephelyList = telephelyek as Telephely[]));
        this.entityService.getAll('api/marka').subscribe(markak => (this.markaList = markak as Marka[]));
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
            name: 'gepList-modification',
            content: 'OK'
        });

        this.toasterService.success('Sikeres mentés');
    }

    onSaveError(response: any) {
        this.alertService.error('Sikertelen mentés!');
    }
}

@Component({
    selector: 'jhi-gep-modal-popup',
    template: ''
})
export class GepModalPopupComponent implements OnInit, OnDestroy {
    routeSub: any;

    constructor(private route: ActivatedRoute, private popupService: PopupComponent) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.popupService.open(GepModalComponent as Component, params['id'], 'gep');
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
