import { Component, OnDestroy, OnInit } from '@angular/core';
import { Telephely } from 'app/entities/telephely/telephely.model';
import { Megye } from 'app/models/megye.model';
import { JhiAlertService, JhiEventManager } from 'ng-jhipster';
import { EntityService } from '../../../entity.service';
import { ActivatedRoute } from '@angular/router';
import { PopupComponent } from 'app/entities/abstract/service/popup.component';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Dolgozo } from 'app/entities/dolgozo/dolgozo.model';
import { Beosztas } from 'app/models/beosztas.model';

@Component({
    selector: 'jhi-dolgozo-modal',
    templateUrl: './dolgozo-modal.component.html'
})
export class DolgozoModalComponent implements OnInit, OnDestroy {
    dolgozo: Dolgozo;
    telephelyek: Telephely[];
    beosztasok: Beosztas[];
    telephely: Telephely;
    beosztas: Beosztas;
    url = '';
    entity = new Dolgozo();

    constructor(
        private alertService: JhiAlertService,
        private entityService: EntityService,
        private route: ActivatedRoute,
        private toasterService: ToastrService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {
        this.telephely = new Megye();
        this.beosztas = new Beosztas();
        this.dolgozo = new Dolgozo();
    }

    ngOnDestroy(): void {}

    ngOnInit(): void {
        this.entityService.getAll('api/telephely').subscribe(telephelyek => (this.telephelyek = telephelyek as Telephely[]));
        this.entityService.getAll('api/beosztas').subscribe(beosztasok => (this.beosztasok = beosztasok as Beosztas[]));
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
            name: 'dolgozoList-modification',
            content: 'OK'
        });

        this.toasterService.success('Sikeres mentés');
    }

    onSaveError(response: any) {
        this.alertService.error('Sikertelen mentés!');
    }
}

@Component({
    selector: 'jhi-dolgozo-modal-popup',
    template: ''
})
export class DolgozoModalPopupComponent implements OnInit, OnDestroy {
    routeSub: any;

    constructor(private route: ActivatedRoute, private popupService: PopupComponent) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.popupService.open(DolgozoModalComponent as Component, params['id'], 'dolgozo');
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
