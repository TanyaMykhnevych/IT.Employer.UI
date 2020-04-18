import { Routes } from '@angular/router';
import { EmployeesViewComponent } from '../containers/search/employees-view.component';
import { AuthGuard } from '../../../core/auth';
import { EmployeeRegisterComponent } from '../containers/register/employee-register.component';


export const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: 'search',
        pathMatch: 'full',
      },
      {
        path: 'search',
        component: EmployeesViewComponent,
        runGuardsAndResolvers: 'paramsOrQueryParamsChange',
      },
      {
        path: 'register',
        component: EmployeeRegisterComponent,
      },
    ]
  },
];
