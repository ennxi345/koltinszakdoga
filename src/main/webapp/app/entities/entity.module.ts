import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { EntityService } from '../../entity.service';
import { VehicleComponent } from 'app/entities/vehicle/vehicle.component';
import { RouterModule } from '@angular/router';
import { entityRoute } from 'app/entities/entity.route';
import { CommonModule } from '@angular/common';
import { HeadquarterComponent } from 'app/entities/headquarter/headquarter.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { HeadquarterModalComponent } from 'app/entities/headquarter/headquarter-modal.component';
import { BsModalService, ComponentLoaderFactory, ModalModule, PositioningService } from 'ngx-bootstrap';

const ENTITY_STATES = [...entityRoute];

@NgModule({
    // prettier-ignore
    imports: [
        RouterModule.forRoot(ENTITY_STATES, {useHash: true}),
        FormsModule,
        HttpClientModule,
        CommonModule,
        NgSelectModule,
        ModalModule.forRoot()
    ],
    declarations: [VehicleComponent, HeadquarterComponent, HeadquarterModalComponent],
    entryComponents: [HeadquarterModalComponent],
    providers: [EntityService, BsModalService, ComponentLoaderFactory, PositioningService],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class KotlinsterEntityModule {}
