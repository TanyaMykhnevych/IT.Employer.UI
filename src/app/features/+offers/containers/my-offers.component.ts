import { Component, OnInit } from '@angular/core';
import { HireService } from '../../+shared/hiring/services/hire.service';
import { CurrentUserService } from '../../../core/permission/services';
import { first } from 'rxjs/operators';
import { Hire } from '../../../models/hiring/hire';
import { HireStatus } from '../../../models/hiring/hire-status';
import { Team, Employee } from '../../../models';
import { ToastrService } from 'ngx-toastr';


@Component({
    selector: 'app-my-offers',
    templateUrl: './my-offers.component.html',
    styleUrls: ['./my-offers.component.scss']
})
export class MyOffersComponent implements OnInit {

    public openHires: Hire[] = [];
    public approvedHires: Hire[] = [];
    public declinedHires: Hire[] = [];

    constructor(
        private hireService: HireService,
        private currentUserService: CurrentUserService,
        private notificationService: ToastrService) { }

    public ngOnInit(): void {
        if (this.currentUserService.userInfo) {
            this.loadHires(this.currentUserService.userInfo.companyId);
        } else {
            this.currentUserService.userInfoChanged
                .pipe(first())
                .subscribe(_ => this.loadHires(this.currentUserService.userInfo.companyId));
        }
    }

    public get openLabel(): string {
        let open = 'Open';

        if (this.openHires.length > 0) {
            open += ` (${this.openHires.length})`;
        }

        return open;
    }

    public get approvedLabel(): string {
        let approved = 'Approved';

        if (this.approvedHires.length > 0) {
            approved += ` (${this.approvedHires.length})`;
        }

        return approved;
    }

    public get declinedLabel(): string {
        let declined = 'Declined';

        if (this.declinedHires.length > 0) {
            declined += ` (${this.declinedHires.length})`;
        }

        return declined;
    }

    public getTeamLink(team: Team): string[] {
        return [`/teams/${team.id}`];
    }

    public getEmployeeLink(employee: Employee): string[] {
        return [`/employees/${employee.id}`];
    }

    public getTotalHourRate(hire: Hire): number {
        return hire.totalHiringRate;
    }

    public getTotalRateToBePaid(hire: Hire): number {
        return hire.team
            ? hire.team.members.reduce((sum, e) => sum += e.hourRate, 0)
            : hire.employee.hourRate;
    }

    public getTotalPrice(hire: Hire): number {
        let count = 0;
        const hiredFrom = new Date(hire.hiredFrom);
        const hiredTo = new Date(hire.hiredTo);

        for (; hiredFrom.getTime() < hiredTo.getTime(); hiredFrom.setDate(hiredFrom.getDate() + 1)) {
            if (hiredFrom.getDay() > 0 && hiredFrom.getDay() < 6) {
                count++;
            }
        }

        return count * 8 * this.getTotalHourRate(hire);
    }

    public getTotalPriceToBePaid(hire: Hire): number {
        let count = 0;
        const hiredFrom = new Date(hire.hiredFrom);
        const hiredTo = new Date(hire.hiredTo);

        for (; hiredFrom.getTime() < hiredTo.getTime(); hiredFrom.setDate(hiredFrom.getDate() + 1)) {
            if (hiredFrom.getDay() > 0 && hiredFrom.getDay() < 6) {
                count++;
            }
        }

        return count * 8 * this.getTotalRateToBePaid(hire);
    }

    public decline(hire: Hire): void {
        this.hireService.decline(hire.id)
            .subscribe(() => {
                this.loadHires(this.currentUserService.userInfo.companyId);
                this.notificationService.success('Offer was successfully declined');
            });
    }

    public approve(hire: Hire): void {
        this.hireService.approve(hire.id)
            .subscribe(() => {
                this.loadHires(this.currentUserService.userInfo.companyId);
                this.notificationService.success('Offer was successfully approved');
            });
    }

    private loadHires(companyId: string): void {
        this.hireService.getByCompanyId(companyId)
            .subscribe(hires => {
                this.openHires = hires.filter(h => h.status === HireStatus.Open);
                this.approvedHires = hires.filter(h => h.status === HireStatus.Approved);
                this.declinedHires = hires.filter(h => h.status === HireStatus.Declined);
            });
    }
}
