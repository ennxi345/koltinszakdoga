import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { EntityService } from '../../entity.service';
import { VehicleComponent } from 'app/entities/vehicle/vehicle.component';
import { RouterModule } from '@angular/router';
import { entityPopupRoute, entityRoute } from 'app/entities/entity.route';
import { TelephelyComponent } from 'app/entities/headquarter/telephely.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { TelephelyModalComponent, TelephelyModalPopupComponent } from 'app/entities/headquarter/telephely-modal.component';
import { KotlinsterSharedModule } from 'app/shared';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { DeleteDialogComponent, DeleteDialogPopupComponent } from 'app/entities/abstract/component/delete-dialog.component';
import { PopupComponent } from 'app/entities/abstract/service/popup.component';
import { TableBuilderComponent } from 'app/entities/abstract/component/table-builder.component';

const ENTITY_STATES = [...entityRoute, ...entityPopupRoute];

@NgModule({
    // prettier-ignore
    imports: [
        RouterModule.forRoot(ENTITY_STATES, {useHash: true}),
        KotlinsterSharedModule,
        NgSelectModule,
        NgxDatatableModule,

    ],
    declarations: [
        VehicleComponent,
        TelephelyComponent,
        TelephelyModalComponent,
        DeleteDialogComponent,
        DeleteDialogPopupComponent,
        TelephelyModalPopupComponent,
        TableBuilderComponent
    ],
    entryComponents: [TelephelyModalComponent, DeleteDialogComponent, DeleteDialogPopupComponent, TelephelyModalPopupComponent],
    providers: [EntityService, PopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class KotlinsterEntityModule {}
