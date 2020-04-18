import { Routes } from '@angular/router';
import { AuthGuard } from '../../../core/auth';
import { CompanyRegisterComponent } from '../containers/register/company-register.component';

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
    ]
  },
];
