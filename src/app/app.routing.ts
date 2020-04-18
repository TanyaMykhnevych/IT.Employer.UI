import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './features';
import { CompanyModule } from './features/+company/company.module';
import { EmployeeModule } from './features/+employee/employee.module';
import { P404Component } from './features/+error/404.component';
import { P500Component } from './features/+error/500.component';

export function loadEmployeeModule(): typeof EmployeeModule { return EmployeeModule; }
export function loadCompanyModule(): typeof CompanyModule { return CompanyModule; }

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: '404',
    component: P404Component,
    data: {
      title: 'Page 404'
    }
  },
  {
    path: '500',
    component: P500Component,
    data: {
      title: 'Page 500'
    }
  },
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: 'employees',
        loadChildren: loadEmployeeModule,
      },
      {
        path: 'company',
        loadChildren: loadCompanyModule,
      },
    ]
  },
  // { path: '**', component: P404Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
