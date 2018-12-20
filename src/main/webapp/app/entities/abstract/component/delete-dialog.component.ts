import { Component, OnDestroy, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';
import { JhiAlertService, JhiEventManager } from 'ng-jhipster';
import { EntityService } from '../../../../entity.service';
import { ActivatedRoute } from '@angular/router';
import { Megye } from 'app/entities/county/megye.model';
import { Telephely } from 'app/entities/headquarter/telephely.model';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PopupService } from '@ng-bootstrap/ng-bootstrap/util/popup';
import { PopupComponent } from 'app/entities/abstract/service/popup.component';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'jhi-delete-dialog',
    templateUrl: './delete-dialog.component.html'
})
export class DeleteDialogComponent implements OnInit {
    accepted = false;
    url = '';
    entity = null;

    ngOnInit(): void {}

    constructor(
        private alertService: JhiAlertService,
        private entityService: EntityService,
        private route: ActivatedRoute,
        private toasterService: ToastrService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    confirmDelete(id) {
        this.entityService.delete(id, this.url).subscribe(response => {
            this.eventManager.broadcast({
                name: 'TelephelyList-modification',
                content: 'Deleted telephely'
            });
            this.toasterService.success('Sikeres törlés', null);
            this.activeModal.dismiss(true);
        });
    }

    cancel() {
        this.activeModal.dismiss('cancel');
    }
}

@Component({
    selector: 'jhi-delete-dialog-popup',
    template: ''
})
export class DeleteDialogPopupComponent implements OnInit, OnDestroy {
    routeSub: any;

    constructor(private route: ActivatedRoute, private popupService: PopupComponent) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.popupService.open(DeleteDialogComponent as Component, params['id'], params['entity']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
