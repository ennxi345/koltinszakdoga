import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { EntityService } from '../../entity.service';
import { VehicleComponent } from 'app/entities/vehicle/vehicle.component';
import { RouterModule } from '@angular/router';
import { entityPopupRoute, entityRoute } from 'app/entities/entity.route';
import { TelephelyComponent } from 'app/entities/telephely/telephely.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { TelephelyModalComponent, TelephelyModalPopupComponent } from 'app/entities/telephely/telephely-modal.component';
import { KotlinsterSharedModule } from 'app/shared';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { DeleteDialogComponent, DeleteDialogPopupComponent } from 'app/entities/abstract/component/delete-dialog.component';
import { PopupComponent } from 'app/entities/abstract/service/popup.component';
import { TableBuilderComponent } from 'app/entities/abstract/component/table-builder.component';
import { BsDatepickerModule, DatepickerModule } from 'ngx-bootstrap';
import { DolgozoComponent } from 'app/entities/dolgozo/dolgozo.component';
import { DolgozoModalComponent, DolgozoModalPopupComponent } from 'app/entities/dolgozo/dolgozo-modal.component';
import { GepComponent } from 'app/entities/gep/gep.component';
import { GepModalComponent, GepModalPopupComponent } from 'app/entities/gep/gep-modal.component';

const ENTITY_STATES = [...entityRoute, ...entityPopupRoute];

@NgModule({
    // prettier-ignore
    imports: [
        RouterModule.forRoot(ENTITY_STATES, {useHash: true}),
        KotlinsterSharedModule,
        NgSelectModule,
        NgxDatatableModule,
        DatepickerModule,
        BsDatepickerModule.forRoot()

    ],
    declarations: [
        VehicleComponent,
        TelephelyComponent,
        TelephelyModalComponent,
        DeleteDialogComponent,
        DeleteDialogPopupComponent,
        TelephelyModalPopupComponent,
        TableBuilderComponent,
        DolgozoComponent,
        DolgozoModalComponent,
        DolgozoModalPopupComponent,
        GepComponent,
        GepModalComponent,
        GepModalPopupComponent
    ],
    entryComponents: [
        TelephelyModalComponent,
        DolgozoModalComponent,
        DeleteDialogComponent,
        DeleteDialogPopupComponent,
        TelephelyModalPopupComponent,
        DolgozoModalPopupComponent,
        GepModalComponent,
        GepModalPopupComponent
    ],
    providers: [EntityService, PopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class KotlinsterEntityModule {}
