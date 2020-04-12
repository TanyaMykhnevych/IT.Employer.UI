import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { routes } from './dashboard.routes';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forRoot(routes),
    ],
    declarations: [],
    exports: [
        RouterModule,
    ],
    providers: []
})
export class DashboardRoutingModule { }
