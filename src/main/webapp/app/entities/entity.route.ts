import { Routes } from '@angular/router';
import { VehicleComponent } from 'app/entities/vehicle/vehicle.component';
import { TelephelyComponent } from 'app/entities/headquarter/telephely.component';
import { DeleteDialogComponent, DeleteDialogPopupComponent } from 'app/entities/abstract/component/delete-dialog.component';
import { TelephelyModalPopupComponent } from 'app/entities/headquarter/telephely-modal.component';

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
        path: 'telephely/edit',
        component: TelephelyModalPopupComponent,
        outlet: 'popup'
    },
    {
        path: 'telephely/edit/:id',
        component: TelephelyModalPopupComponent,
        outlet: 'popup'
    },
    {
        path: ':entity/delete/:id',
        component: DeleteDialogPopupComponent,
        outlet: 'popup'
    }
];

export const entityPopupRoute: Routes = [
    /* {
         path: 'telephely/:id/delete',
         component: DeleteDialogPopupComponent,
         outlet: 'popup'
     }*/
];
