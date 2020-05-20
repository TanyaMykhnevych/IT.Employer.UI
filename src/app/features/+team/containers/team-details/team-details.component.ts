import { Component, OnInit } from '@angular/core';
import { Team } from '../../../../models';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { TeamService } from '../../services/team.service';
import { PricePolicyService } from '../../../+shared/services/price-policy/price-policy.service';


@Component({
    selector: 'app-team-details',
    templateUrl: './team-details.component.html',
})
export class TeamDetailsComponent implements OnInit {
    public team: Team;
    public teamHiringHourRate: number;

    constructor(
        private teamService: TeamService,
        protected router: Router,
        protected route: ActivatedRoute,
        private pricePolicyService: PricePolicyService) {
    }

    public ngOnInit(): void {
        this.route.params.pipe(
            switchMap(params => {
                const teamId = params['id'];
                return this.teamService.getTeam(teamId);
            })
        ).subscribe(team => {
            this.team = team;
            this.teamHiringHourRate = this.pricePolicyService.calculateTeamHiringHourRate(
                team.members.map(e => e.hourRate));
        });
    }

    public get availableUntil(): Date {
        return this.team.members[0]?.availableUntil;
    }
}
