import { Routes } from '@angular/router';
import { AuthGuard } from '../../../core/auth';
import { CompanyRegisterComponent } from '../containers/register/company-register.component';
import { CompaniesViewComponent } from '../containers/view/companies-view.component';
import { MyCompanyComponent } from '../containers/my-company/my-company.component';

export const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: 'register',
        pathMatch: 'full',
      },
      {
        path: 'register',
        component: CompanyRegisterComponent,
      },
      {
        path: 'search',
        component: CompaniesViewComponent,
      },
      {
        path: 'my-company',
        component: MyCompanyComponent,
      },
    ]
  },
];
