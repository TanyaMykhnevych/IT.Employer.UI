import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CoreModule } from '../../core/core.module';
import { MainComponent } from './containers/main/main.component';
import { DashboardRoutingModule } from './routes/dashboard-routing.module';

@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule,
    CoreModule,
    RouterModule,
  ],
  exports: [
  ],
  declarations: [MainComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class DashboardModule { }
