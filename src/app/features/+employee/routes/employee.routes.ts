import { Routes } from '@angular/router';
import { EmployeesViewComponent } from '../containers/search/employees-view.component';
import { AuthGuard } from '../../../core/auth';
import { EmployeeRegisterComponent } from '../containers/register/employee-register.component';
import { MyEmployeesComponent } from '../containers/my-employees/my-employees.component';
import { EmployeeDetailsComponent } from '../containers/employee-details/employee-details.component';


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
      {
        path: 'my-employees',
        component: MyEmployeesComponent,
      },
      {
        path: ':id',
        component: EmployeeDetailsComponent
      }
    ]
  },
];
