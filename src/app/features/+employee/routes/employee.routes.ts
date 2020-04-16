import { Route } from '@angular/router';
import { EmployeesViewComponent } from '../containers/employees-view.component';

export const routes: Route[] = [
    {
        path: '',
        component: EmployeesViewComponent,
    },
];
