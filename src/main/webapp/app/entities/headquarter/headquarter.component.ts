import { Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { JhiAlertService, JhiEventManager } from 'ng-jhipster';
import { EntityService } from '../../../entity.service';
import { Headquarter } from 'app/entities/headquarter/headquarter.model';
import { County } from 'app/entities/county/county.model';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { HeadquarterModalComponent } from 'app/entities/headquarter/headquarter-modal.component';
import { Subscription } from 'rxjs';

@Component({
    selector: 'jhi-headquarter',
    templateUrl: './headquarter.component.html'
})
export class HeadquarterComponent implements OnInit, OnDestroy {
    headquarter: Headquarter;
    headquarterList: Headquarter[];
    countyList: County[];
    county: County;
    url = 'api/headquarter';
    modalRef: BsModalRef;
    eventSubscriber: Subscription;

    constructor(
        private alertService: JhiAlertService,
        private router: Router,
        private entityService: EntityService,
        private modalService: BsModalService,
        protected eventManager: JhiEventManager
    ) {
        this.headquarter = new Headquarter();
        this.county = new County();
    }

    ngOnInit() {
        this.loadAll();
        this.eventSubscriber = this.eventManager.subscribe('HeadquarterList-modification', response => this.loadAll());
    }

    loadAll() {
        this.entityService.getAll('api/county').subscribe(counties => (this.countyList = counties as County[]));
        this.entityService.getAll(this.url).subscribe(headquarters => (this.headquarterList = headquarters as Headquarter[]));
    }

    public trackByFn(index, item) {
        return index;
    }

    ngOnDestroy() {}

    findCounty(countyId: number) {
        return this.countyList.find(x => x.id === countyId);
    }

    onEdit(headquarter: Headquarter) {
        const copy = Object.assign({}, headquarter);
        const modal = this.modalService.show(HeadquarterModalComponent);
        (<HeadquarterModalComponent>modal.content).openConfirmDialog(copy);
    }

    openConfirmDialog() {
        this.modalRef = this.modalService.show(HeadquarterModalComponent);
    }

    onDelete(id: number) {
        this.entityService.delete(id, this.url).subscribe(response =>
            this.eventManager.broadcast({
                name: 'HeadquarterList-modification',
                content: 'Deleted headquarte'
            })
        );
        this.alertService.error('Sikeres törlés', true);
    }
}
