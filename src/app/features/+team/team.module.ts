import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from '../../core/core.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TeamService } from './services/team.service';
import { TeamRoutingModule } from './routes/team-routing.module';
import { TeamRegisterComponent } from './containers/register/team-register.component';
import { TeamsViewComponent } from './containers/view/teams-view.component';
import { TeamRegisterFormComponent } from './components/team-register-form/team-register-form.component';
import { SharedModule } from '../+shared/shared.module';
import { TeamSearchFormComponent } from './components/team-search-form/team-search-form.component';
import { TeamListComponent } from './components/team-list/team-list.component';
import { TeamListItemComponent } from './components/team-list-item/team-list-item.component';
import { MaterialModule } from '../../layout/material.module';
import { MyTeamsComponent } from './containers/my-teams/my-teams.component';

@NgModule({
    imports: [
        CommonModule,
        TeamRoutingModule,
        CoreModule,
        ReactiveFormsModule,
        FormsModule,
        SharedModule.forRoot(),
        MaterialModule,
    ],
    declarations: [
        TeamsViewComponent,
        TeamRegisterComponent,
        TeamRegisterFormComponent,
        TeamsViewComponent,
        TeamSearchFormComponent,
        TeamListComponent,
        TeamListItemComponent,
        MyTeamsComponent,
    ],
    entryComponents: [
    ],
})
export class TeamModule {
    public static forRoot(): ModuleWithProviders {
        return {
            ngModule: TeamModule,
            providers: [TeamService],
        };
    }
}
