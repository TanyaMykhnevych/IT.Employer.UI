import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from '../../core/core.module';
import { CompanyRegisterComponent } from './containers/register/company-register.component';
import { CompanyRoutingModule } from './routes/employee-routing.module';
import { CompanyService } from './services/company.service';



@NgModule({
    imports: [
        CommonModule,
        CompanyRoutingModule,
        CoreModule,
        ReactiveFormsModule,
        FormsModule,
    ],
    declarations: [
        CompanyRegisterComponent,
    ],
    entryComponents: [
    ],
})
export class CompanyModule {
    public static forRoot(): ModuleWithProviders {
        return {
            ngModule: CompanyModule,
            providers: [CompanyService],
        };
    }
}
