import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './features';
import { CompanyModule } from './features/+company/company.module';
import { EmployeeModule } from './features/+employee/employee.module';
import { P404Component } from './features/+error/404.component';
import { P500Component } from './features/+error/500.component';
import { VacancyModule } from './features/+vacancy/vacancy.module';
import { TeamModule } from './features/+team/team.module';
import { OffersModule } from './features/+offers/offers.module';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: '404',
    component: P404Component,
  },
  {
    path: '500',
    component: P500Component,
  },
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: 'employees',
        loadChildren: () => EmployeeModule,
      },
      {
        path: 'teams',
        loadChildren: () => TeamModule,
      },
      {
        path: 'company',
        loadChildren: () => CompanyModule,
      },
      {
        path: 'vacancy',
        loadChildren: () => VacancyModule,
      },
      {
        path: 'offers',
        loadChildren: () => OffersModule,
      },
    ]
  },
  { path: '*', component: P404Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
