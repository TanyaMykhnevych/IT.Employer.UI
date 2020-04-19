import { Routes } from '@angular/router';
import { AuthGuard } from '../../../core/auth';
import { CompanyRegisterComponent } from '../containers/register/company-register.component';
import { CompaniesViewComponent } from '../containers/view/companies-view.component';

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
    ]
  },
];
