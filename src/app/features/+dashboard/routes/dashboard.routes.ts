import { Route } from '@angular/router';
import { AuthGuard } from '../../../core/auth';
import { MainComponent } from '../containers/main/main.component';

export const routes: Route[] = [
    {
        path: 'dashboard',
        component: MainComponent,
        canActivate: [AuthGuard],
    },
];

