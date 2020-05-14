import { Component } from '@angular/core';
import { Team } from '../../../../models';
import { TeamService } from '../../services/team.service';
import { CurrentUserService } from '../../../../core/permission/services';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
    selector: 'app-team-register',
    templateUrl: './team-register.component.html'
})
export class TeamRegisterComponent {

    constructor(
        private teamService: TeamService,
        private router: Router,
        private toastr: ToastrService,
        private currentUserService: CurrentUserService) { }

    public registerTeam(team: Team): void {
        team.companyId = this.currentUserService.userInfo.companyId;
        team.members.forEach(m => m.companyId = team.companyId);

        const observable = team.id
            ? this.teamService.update(team)
            : this.teamService.create(team);

        observable.subscribe(_ => {
            this.toastr.success('Team was successfully registered');
            this.router.navigate(['/teams/search']);
        });
    }
}
