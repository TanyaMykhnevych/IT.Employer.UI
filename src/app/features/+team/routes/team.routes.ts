import { Routes } from '@angular/router';
import { AuthGuard } from '../../../core/auth';
import { TeamsViewComponent } from '../containers/search/teams-view.component';
import { TeamRegisterComponent } from '../containers/register/team-register.component';

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
                path: 'register',
                component: TeamRegisterComponent,
            },
        ]
    },
];
