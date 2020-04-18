import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from '../../core/core.module';
import { EmployeeRegisterComponent } from './containers/register/employee-register.component';
import { EmployeesViewComponent } from './containers/search/employees-view.component';
import { EmployeeRoutingModule } from './routes/employee-routing.module';
import { EmployeeService } from './services/employee.service';



@NgModule({
    imports: [
        CommonModule,
        EmployeeRoutingModule,
        CoreModule,
        ReactiveFormsModule,
        FormsModule,
    ],
    declarations: [
        EmployeesViewComponent,
        EmployeeRegisterComponent,
    ],
    entryComponents: [
    ],
})
export class EmployeeModule {
    public static forRoot(): ModuleWithProviders {
        return {
            ngModule: EmployeeModule,
            providers: [EmployeeService],
        };
    }
}
