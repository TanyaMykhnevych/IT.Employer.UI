import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from '../../core/core.module';
import { EmployeeRegisterComponent } from './containers/register/employee-register.component';
import { EmployeesViewComponent } from './containers/search/employees-view.component';
import { EmployeeRoutingModule } from './routes/employee-routing.module';
import { EmployeeService } from './services/employee.service';
import { EmployeeRegisterFormComponent } from './components/employee-register-form/employee-register-form.component';
import { SharedModule } from '../+shared/shared.module';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { EmployeeSearchFormComponent } from './components/employee-search/employee-search-form.component';
import { EmployeeListItemComponent } from './components/employee-list-item/employee-list-item.component';
import { MaterialModule } from '../../layout/material.module';
import { MyEmployeesComponent } from './containers/my-employees/my-employees.component';


@NgModule({
    imports: [
        CommonModule,
        EmployeeRoutingModule,
        CoreModule,
        ReactiveFormsModule,
        FormsModule,
        SharedModule.forRoot(),
        MaterialModule
    ],
    declarations: [
        EmployeesViewComponent,
        EmployeeRegisterComponent,
        EmployeeRegisterFormComponent,
        EmployeeListComponent,
        EmployeeSearchFormComponent,
        EmployeeListItemComponent,
        MyEmployeesComponent
    ],
    entryComponents: [
    ],
    exports: [
        EmployeeListItemComponent,
        EmployeeListComponent
    ]
})
export class EmployeeModule {
    public static forRoot(): ModuleWithProviders {
        return {
            ngModule: EmployeeModule,
            providers: [EmployeeService],
        };
    }
}
