import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from '../../core/core.module';
import { MaterialModule } from '../../layout/material.module';
import { CompanyFormComponent } from './components/company-form/company-form.component';
import { CompanyListComponent } from './components/company-list/company-list.component';
import { CompanySearchFormComponent } from './components/company-search-form/company-search-form.component';
import { CompanyRegisterComponent } from './containers/register/company-register.component';
import { CompaniesViewComponent } from './containers/view/companies-view.component';
import { CompanyRoutingModule } from './routes/employee-routing.module';
import { CompanyService } from './services/company.service';



@NgModule({
    imports: [
        CommonModule,
        MaterialModule,
        CompanyRoutingModule,
        CoreModule,
        ReactiveFormsModule,
        FormsModule,
    ],
    declarations: [
        CompanyRegisterComponent,
        CompanySearchFormComponent,
        CompanyListComponent,
        CompaniesViewComponent,
        CompanyFormComponent,
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
