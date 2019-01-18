import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';

import { NgbDateMomentAdapter } from './util/datepicker-adapter';
import { HasAnyAuthorityDirective, JhiLoginModalComponent, KotlinsterSharedCommonModule, KotlinsterSharedLibsModule } from './';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { BsModalService, ComponentLoaderFactory, ModalModule, PositioningService } from 'ngx-bootstrap';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MatTableModule } from '@angular/material';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

@NgModule({
    imports: [
        KotlinsterSharedLibsModule,
        KotlinsterSharedCommonModule,
        FormsModule,
        HttpClientModule,
        CommonModule,
        ModalModule.forRoot(),
        ToastrModule.forRoot(),
        BrowserAnimationsModule,
        TranslateModule,
        MatTableModule,
        NgxDatatableModule
    ],
    declarations: [JhiLoginModalComponent, HasAnyAuthorityDirective],
    providers: [
        { provide: NgbDateAdapter, useClass: NgbDateMomentAdapter },
        BsModalService,
        ComponentLoaderFactory,
        PositioningService,
        ToastrService,
        TranslateService
    ],
    entryComponents: [JhiLoginModalComponent],
    exports: [KotlinsterSharedCommonModule, JhiLoginModalComponent, HasAnyAuthorityDirective],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class KotlinsterSharedModule {}
