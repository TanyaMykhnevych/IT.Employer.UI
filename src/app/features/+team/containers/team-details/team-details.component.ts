import { Component, OnInit } from '@angular/core';
import { Team } from '../../../../models';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { TeamService } from '../../services/team.service';
import { PricePolicyService } from '../../../+shared/services/price-policy/price-policy.service';
import { IUserInfo } from '../../../../core/auth';
import { CurrentUserService } from '../../../../core/permission/services';
import { MatDialog } from '@angular/material/dialog';
import { HirePopupComponent } from '../../../+shared/hiring/components/hire-popup/hire-popup.component';
import { DefaultPopupConfig } from '../../../+shared/hiring/constants/default-popup-config.const';
import { ToastrService } from 'ngx-toastr';
import { HireService } from '../../../+shared/hiring/services/hire.service';


@Component({
    selector: 'app-team-details',
    templateUrl: './team-details.component.html',
})
export class TeamDetailsComponent implements OnInit {
    private currentUserInfo: IUserInfo;

    public team: Team;
    public teamHiringHourRate: number;

    constructor(
        private teamService: TeamService,
        protected router: Router,
        protected route: ActivatedRoute,
        private pricePolicyService: PricePolicyService,
        private currentUserService: CurrentUserService,
        private dialogService: MatDialog,
        private notificationService: ToastrService,
        private hireService: HireService) {
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

        if (this.currentUserService.userInfo) {
            this.currentUserInfo = this.currentUserService.userInfo;
        } else {
            this.currentUserService.userInfoChanged.subscribe(_ => this.currentUserInfo = this.currentUserService.userInfo);
        }
    }

    public get availableUntil(): Date {
        return this.team.members[0]?.availableUntil;
    }

    public get relatesToCurrentCompany(): boolean {
        return this.currentUserInfo && this.currentUserInfo.companyId === this.team.companyId;
    }

    public hireTeam(): void {
        const dialogRef = this.dialogService.open(HirePopupComponent, DefaultPopupConfig);
        dialogRef.componentInstance.team = this.team;

        dialogRef.componentInstance.hireCreated.subscribe(hire => {
            this.hireService.create(hire).subscribe(
                _ => this.notificationService.success('Hire request was successfully sent')
            );
        });
    }
}
