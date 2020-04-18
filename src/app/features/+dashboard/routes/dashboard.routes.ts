import { Route } from '@angular/router';
import { EmployeeModule } from '../../+employee/employee.module';
import { AuthGuard } from '../../../core/auth';
import { MainComponent } from '../containers/main/main.component';

export function loadEmployeeModule(): typeof EmployeeModule { return EmployeeModule; }

export const routes: Route[] = [
    {
        path: 'dashboard',
        component: MainComponent,
        canActivate: [AuthGuard],
    },
];

