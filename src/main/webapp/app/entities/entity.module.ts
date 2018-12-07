import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { EntityService } from '../../entity.service';
import { VehicleComponent } from 'app/entities/vehicle/vehicle.component';
import { RouterModule } from '@angular/router';
import { entityRoute } from 'app/entities/entity.route';
import { TelephelyComponent } from 'app/entities/headquarter/telephely.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { TelephelyModalComponent } from 'app/entities/headquarter/telephely-modal.component';
import { KotlinsterSharedModule } from 'app/shared';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

const ENTITY_STATES = [...entityRoute];

@NgModule({
    // prettier-ignore
    imports: [
        RouterModule.forRoot(ENTITY_STATES, {useHash: true}),
        KotlinsterSharedModule,
        NgSelectModule,
        NgxDatatableModule,

    ],
    declarations: [VehicleComponent, TelephelyComponent, TelephelyModalComponent],
    entryComponents: [TelephelyModalComponent],
    providers: [EntityService],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class KotlinsterEntityModule {}
