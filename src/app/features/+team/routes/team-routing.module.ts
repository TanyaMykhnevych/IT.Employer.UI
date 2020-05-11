import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { routes } from './team.routes';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
    ],
    declarations: [],
})
export class TeamRoutingModule { }
