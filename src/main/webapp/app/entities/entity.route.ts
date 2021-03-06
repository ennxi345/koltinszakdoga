import { Routes } from '@angular/router';
import { TelephelyComponent } from 'app/entities/telephely/telephely.component';
import { DeleteDialogPopupComponent } from 'app/entities/abstract/component/delete-dialog.component';
import { TelephelyModalPopupComponent } from 'app/entities/telephely/telephely-modal.component';
import { DolgozoComponent } from 'app/entities/dolgozo/dolgozo.component';
import { DolgozoModalPopupComponent } from 'app/entities/dolgozo/dolgozo-modal.component';
import { GepComponent } from 'app/entities/gep/gep.component';
import { GepModalPopupComponent } from 'app/entities/gep/gep-modal.component';

export const entityRoute: Routes = [
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
        path: 'dolgozo/edit/:id',
        component: DolgozoModalPopupComponent,
        outlet: 'popup'
    },
    {
        path: 'gep',
        component: GepComponent
    },
    {
        path: 'gep/edit',
        component: GepModalPopupComponent,
        outlet: 'popup'
    },
    {
        path: 'gep/edit/:id',
        component: GepModalPopupComponent,
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
