import { Routes } from '@angular/router';
import { AuthGuard } from '../../../core/auth';
import { CreateVacancyComponent } from '../containers/create/create-vacancy.component';
import { MyVacanciesComponent } from '../containers/my-vacancies/my-vacancies.component';
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
      {
        path: 'create',
        component: CreateVacancyComponent,
      },
      {
        path: 'my',
        component: MyVacanciesComponent,
      },
    ]
  },
];
