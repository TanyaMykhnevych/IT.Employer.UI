import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DashboardModule } from '../+dashboard/dashboard.module';
import { CoreModule } from '../../core/core.module';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './routes/home-routing.module';


@NgModule({
    imports: [
        CommonModule,
        HomeRoutingModule,
        CoreModule,
        RouterModule,
        DashboardModule,
    ],
    declarations: [
        HomeComponent,
    ],
})
export class HomeModule { }
