import { Routes } from '@angular/router';
import { VehicleComponent } from 'app/entities/vehicle/vehicle.component';
import { TelephelyComponent } from 'app/entities/telephely/telephely.component';
import { DeleteDialogPopupComponent } from 'app/entities/abstract/component/delete-dialog.component';
import { TelephelyModalPopupComponent } from 'app/entities/telephely/telephely-modal.component';
import { DolgozoComponent } from 'app/entities/dolgozo/dolgozo.component';
import { DolgozoModalPopupComponent } from 'app/entities/dolgozo/dolgozo-modal.component';
import { GepComponent } from 'app/entities/gep/gep.component';

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
        path: 'dolgozo',
        component: DolgozoComponent
    },
    {
        path: 'dolgozo/edit',
        component: DolgozoModalPopupComponent,
        outlet: 'popup'
    },
    {
        path: 'gep',
        component: GepComponent
    },
    {
        path: 'dolgozo/edit/:id',
        component: DolgozoModalPopupComponent,
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
