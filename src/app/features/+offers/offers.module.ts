import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from '../../core/core.module';
import { MaterialModule } from '../../layout/material.module';
import { MyOffersComponent } from './containers/my-offers.component';
import { OffersRoutingModule } from './routes/offers-routing.module';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterModule } from '@angular/router';


@NgModule({
    imports: [
        CommonModule,
        MaterialModule,
        OffersRoutingModule,
        CoreModule,
        ReactiveFormsModule,
        FormsModule,
        MaterialModule,
        MatTabsModule,
        RouterModule
    ],
    declarations: [
        MyOffersComponent,
    ],
    entryComponents: [
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class OffersModule {
    public static forRoot(): ModuleWithProviders {
        return {
            ngModule: OffersModule,
            providers: [],
        };
    }
}
