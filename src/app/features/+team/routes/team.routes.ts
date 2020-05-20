import { Routes } from '@angular/router';
import { AuthGuard } from '../../../core/auth';
import { TeamsViewComponent } from '../containers/view/teams-view.component';
import { TeamRegisterComponent } from '../containers/register/team-register.component';
import { MyTeamsComponent } from '../containers/my-teams/my-teams.component';
import { TeamDetailsComponent } from '../containers/team-details/team-details.component';

export const routes: Routes = [
    {
        path: '',
        canActivate: [AuthGuard],
        children: [
            {
                path: '',
                redirectTo: 'search',
                pathMatch: 'full',
            },
            {
                path: 'search',
                component: TeamsViewComponent,
                runGuardsAndResolvers: 'paramsOrQueryParamsChange',
            },
            {
                path: 'my-teams',
                component: MyTeamsComponent,
                runGuardsAndResolvers: 'paramsOrQueryParamsChange',
            },
            {
                path: 'register',
                component: TeamRegisterComponent,
            },
            {
                path: ':id',
                component: TeamDetailsComponent,
            }
        ]
    },
];
