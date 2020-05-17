import { Routes } from '@angular/router';
import { AuthGuard } from '../../../core/auth';
import { MyOffersComponent } from '../containers/my-offers.component';

export const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: 'my',
        pathMatch: 'full',
      },
      {
        path: 'my',
        component: MyOffersComponent,
      },
    ]
  },
];
