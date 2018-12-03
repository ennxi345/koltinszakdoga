import { NgModule } from '@angular/core';

import { KotlinsterSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent } from './';

@NgModule({
    imports: [KotlinsterSharedLibsModule],
    declarations: [JhiAlertComponent, JhiAlertErrorComponent],
    exports: [KotlinsterSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent]
})
export class KotlinsterSharedCommonModule {}
