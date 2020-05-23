import { Routes } from '@angular/router';
import { AuthGuard } from '../../../core/auth';
import { ChatComponent } from '../containers/chat.component';

export const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: ChatComponent,
      },
    ]
  },
];
