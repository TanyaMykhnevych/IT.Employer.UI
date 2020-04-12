import { NgModule } from '@angular/core';
import { AppAsideModule, AppBreadcrumbModule, AppFooterModule, AppHeaderModule, AppSidebarModule } from '@coreui/angular';
import { TranslateModule } from '@ngx-translate/core';
import { ChartsModule } from 'ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { AuthModule } from './auth';

@NgModule({
    imports: [
        AuthModule.forRoot(),
        TranslateModule,
        AppAsideModule,
        AppBreadcrumbModule.forRoot(),
        AppFooterModule,
        AppHeaderModule,
        AppSidebarModule,
        PerfectScrollbarModule,
        BsDropdownModule.forRoot(),
        TabsModule.forRoot(),
        ChartsModule,
    ],
    exports: [
        TranslateModule,
        AppAsideModule,
        AppBreadcrumbModule,
        AppFooterModule,
        AppHeaderModule,
        AppSidebarModule,
        PerfectScrollbarModule,
        BsDropdownModule,
        TabsModule,
        ChartsModule,
    ],
    declarations: [    ],
})
export class CoreModule { }
