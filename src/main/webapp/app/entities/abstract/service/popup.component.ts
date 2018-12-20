import { Component, Injectable } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { EntityService } from '../../../../entity.service';
import { Telephely } from 'app/entities/headquarter/telephely.model';

@Injectable()
export class PopupComponent {
    private ngbModalRef: NgbModalRef;
    url = 'api/telephely';

    constructor(private modalService: NgbModal, private router: Router, private entityService: EntityService) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.entityService.find(id, this.url).subscribe(entity => {
                    this.ngbModalRef = this.entityModalRef(component, entity);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.entityModalRef(component, new Telephely());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    entityModalRef(component: Component, entity: Telephely): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static' });
        modalRef.componentInstance.entity = entity;
        modalRef.result.then(
            result => {
                this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true });
                this.ngbModalRef = null;
            },
            reason => {
                this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true });
                this.ngbModalRef = null;
            }
        );
        return modalRef;
    }
}
