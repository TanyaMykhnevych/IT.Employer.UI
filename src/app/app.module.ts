import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ToastrModule } from 'ngx-toastr';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';
import { CompanyModule } from './features/+company/company.module';
import { DashboardModule } from './features/+dashboard/dashboard.module';
import { EmployeeModule } from './features/+employee/employee.module';
import { P404Component } from './features/+error/404.component';
import { P500Component } from './features/+error/500.component';
import { HomeModule } from './features/+home/home.module';
import { LoginModule } from './features/+login';
import { VacancyModule } from './features/+vacancy/vacancy.module';
import { MaterialModule } from './layout/material.module';
import { UserInfoService } from './core/auth';
import { loadUserInfo } from './core/app-initializers/load-user-info.initializer';
import { TeamModule } from './features/+team/team.module';
import { SettingsService } from './core/settings/services/settings.service';
import { loadSettings } from './core/app-initializers/load-settings.initializer';
import { CurrentUserService } from './core/permission/services';


@NgModule({
  imports: [
    BrowserModule,
    MaterialModule,
    ToastrModule.forRoot(),
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    DashboardModule.forRoot(),
    HomeModule,
    LoginModule.forRoot(),
    EmployeeModule.forRoot(),
    TeamModule.forRoot(),
    CompanyModule.forRoot(),
    VacancyModule.forRoot(),
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
  providers: [
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy,
    },
    {
      provide: APP_INITIALIZER,
      useFactory: (userInfoService: UserInfoService) => loadUserInfo(userInfoService),
      deps: [UserInfoService],
      multi: true
    },
    {
      provide: APP_INITIALIZER,
      useFactory: (settingsService: SettingsService) => loadSettings(settingsService),
      deps: [SettingsService],
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
