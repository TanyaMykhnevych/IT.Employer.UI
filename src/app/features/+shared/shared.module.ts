import { NgModule, ModuleWithProviders } from '@angular/core';
import { SingleEmployeeRegisterFormComponent } from './components/single-employee-register-form/single-employee-register-form.component';
import { CommonModule } from '@angular/common';
import { CoreModule } from '../../core/core.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PricePolicyService } from './services/price-policy/price-policy.service';
import { HireService } from './hiring/services/hire.service';
import { HirePopupComponent } from './hiring/components/hire-popup/hire-popup.component';
import { MaterialModule } from '../../layout/material.module';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@NgModule({
    imports: [
        CommonModule,
        CoreModule,
        ReactiveFormsModule,
        FormsModule,
        MaterialModule,
        MatButtonModule,
        MatDatepickerModule,
        MatNativeDateModule,
    ],
    exports: [
        SingleEmployeeRegisterFormComponent,
        HirePopupComponent
    ],
    declarations: [
        SingleEmployeeRegisterFormComponent,
        HirePopupComponent
    ],
    entryComponents: [
        HirePopupComponent
    ]
})
export class SharedModule {
    public static forRoot(): ModuleWithProviders {
        return {
            ngModule: SharedModule,
            providers: [
                PricePolicyService,
                HireService
            ]
        };
    }
}
