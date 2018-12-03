import { Component, OnDestroy, OnInit } from '@angular/core';
import { Headquarter } from 'app/entities/headquarter/headquarter.model';
import { County } from 'app/entities/county/county.model';
import { JhiAlertService, JhiEventManager } from 'ng-jhipster';
import { EntityService } from '../../../entity.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef } from 'ngx-bootstrap';
import { entityRoute } from 'app/entities/entity.route';

@Component({
    selector: 'jhi-dialog-headquarter',
    templateUrl: './headquarter-modal.component.html'
})
export class HeadquarterModalComponent implements OnInit, OnDestroy {
    headquarter: Headquarter;
    countyList: County[];
    county: County;
    url = 'api/headquarter';

    constructor(
        private alertService: JhiAlertService,
        private entityService: EntityService,
        private route: ActivatedRoute,
        private modalRef: BsModalRef,
        protected eventManager: JhiEventManager
    ) {
        this.county = new County();
        this.headquarter = new Headquarter();
    }

    ngOnDestroy(): void {}

    ngOnInit(): void {
        this.entityService.getAll('api/county').subscribe(counties => (this.countyList = counties as County[]));
    }

    save() {
        if (!this.headquarter.id) {
            this.entityService
                .create(this.headquarter, this.url)
                .subscribe(response => this.onSaveSuccess(response), response => this.onSaveError(response));
        } else {
            this.entityService
                .update(this.headquarter, this.url)
                .subscribe(response => this.onSaveSuccess(response), response => this.onSaveError(response));
        }
    }

    public openConfirmDialog(entity: Headquarter): void {
        if (entity) {
            this.headquarter = entity;
            console.log(this.headquarter);
        }
    }

    cancel() {
        this.modalRef.hide();
    }

    onSaveSuccess(response: any) {
        this.modalRef.hide();
        this.eventManager.broadcast({
            name: 'HeadquarterList-modification',
            content: 'OK'
        });

        this.alertService.success('Sikeres mentés');
    }

    onSaveError(response: any) {
        this.alertService.error('Sikertelen mentéssdsd!');
    }
}
