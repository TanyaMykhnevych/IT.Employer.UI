import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from '../../core/core.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TeamService } from './services/team.service';
import { TeamRoutingModule } from './routes/team-routing.module';
import { TeamRegisterComponent } from './containers/register/team-register.component';
import { TeamsViewComponent } from './containers/search/teams-view.component';
import { TeamRegisterFormComponent } from './components/team-register-form/team-register-form.component';
import { SharedModule } from '../+shared/shared.module';

@NgModule({
    imports: [
        CommonModule,
        TeamRoutingModule,
        CoreModule,
        ReactiveFormsModule,
        FormsModule,
        SharedModule.forRoot()
    ],
    declarations: [
        TeamsViewComponent,
        TeamRegisterComponent,
        TeamRegisterFormComponent,
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
