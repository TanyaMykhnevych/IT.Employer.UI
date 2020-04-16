import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from '../../core/core.module';
import { EmployeesViewComponent } from './containers/employees-view.component';
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
