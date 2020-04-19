import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';
import { DashboardModule } from './features/+dashboard/dashboard.module';
import { EmployeeModule } from './features/+employee/employee.module';
import { HomeModule } from './features/+home/home.module';
import { LoginModule } from './features/+login';
import { P500Component } from './features/+error/500.component';
import { P404Component } from './features/+error/404.component';
import { CompanyModule } from './features/+company/company.module';
import { MaterialModule } from './layout/material.module';


@NgModule({
  imports: [
    BrowserModule,
    MaterialModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    DashboardModule,
    HomeModule,
    LoginModule.forRoot(),
    EmployeeModule.forRoot(),
    CompanyModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: ((http: HttpClient) => new TranslateHttpLoader(http, './assets/i18n/', '.json')),
        deps: [HttpClient],
      },
    }),
  ],
  declarations: [
    AppComponent,
    P404Component,
    P500Component,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
