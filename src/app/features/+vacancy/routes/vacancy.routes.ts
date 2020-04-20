import { Routes } from '@angular/router';
import { AuthGuard } from '../../../core/auth';
import { VacanciesViewComponent } from '../containers/view/vacancies-view.component';

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
        component: VacanciesViewComponent,
      },
    ]
  },
];
