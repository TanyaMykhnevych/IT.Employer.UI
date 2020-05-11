import { NgModule, ModuleWithProviders } from '@angular/core';
import { SingleEmployeeRegisterFormComponent } from './components/single-employee-register-form/single-employee-register-form.component';
import { CommonModule } from '@angular/common';
import { CoreModule } from '../../core/core.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        CoreModule,
        ReactiveFormsModule,
        FormsModule,
    ],
    exports: [
        SingleEmployeeRegisterFormComponent
    ],
    declarations: [
        SingleEmployeeRegisterFormComponent
    ]
})
export class SharedModule {
    public static forRoot(): ModuleWithProviders {
        return {
            ngModule: SharedModule,
        };
    }
}
