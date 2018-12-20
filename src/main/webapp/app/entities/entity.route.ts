import { Routes } from '@angular/router';
import { VehicleComponent } from 'app/entities/vehicle/vehicle.component';
import { TelephelyComponent } from 'app/entities/headquarter/telephely.component';
import { DeleteDialogComponent, DeleteDialogPopupComponent } from 'app/entities/abstract/component/delete-dialog.component';

export const entityRoute: Routes = [
    {
        path: 'vehicle',
        component: VehicleComponent
    },
    {
        path: 'telephely',
        component: TelephelyComponent
    },
    {
        path: 'telephely/:id/delete',
        component: DeleteDialogPopupComponent,
        outlet: 'popup'
    }
];

export const entityPopupRoute: Routes = [
    {
        path: 'telephely/:id/delete',
        component: DeleteDialogPopupComponent,
        outlet: 'popup'
    }
];
