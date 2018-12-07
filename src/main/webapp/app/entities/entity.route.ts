import { Routes } from '@angular/router';
import { VehicleComponent } from 'app/entities/vehicle/vehicle.component';
import { TelephelyComponent } from 'app/entities/headquarter/telephely.component';

export const entityRoute: Routes = [
    {
        path: 'vehicle',
        component: VehicleComponent
    },
    {
        path: 'telephely',
        component: TelephelyComponent
    }
];
