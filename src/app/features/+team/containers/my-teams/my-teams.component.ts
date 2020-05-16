import { Component } from '@angular/core';
import { cloneDeep } from 'lodash';
import { CurrentUserService } from '../../../../core/permission/services';
import { ISearchResponse, TeamSearchItem, TeamSearchParameter } from '../../../../models';
import { TeamService } from '../../services/team.service';
import { AbstractSearchListView } from '../../../../core/search';
import { Router, ActivatedRoute } from '@angular/router';
import { UserInfoService } from '../../../../core/auth';

@Component({
    selector: 'app-my-teams',
    templateUrl: './my-teams.component.html',
    styleUrls: ['./my-teams.component.scss'],
})
export class MyTeamsComponent extends AbstractSearchListView<TeamSearchParameter> {
    public teams: TeamSearchItem[];
    public totalCount: number;

    constructor(
        protected router: Router,
        protected route: ActivatedRoute,
        private _teamService: TeamService,
        private _currentUserService: CurrentUserService,
        private _userInfoService: UserInfoService) {
        super();
    }

    public loadData(): void {
        this._userInfoService.loadUserInfo().subscribe(info => this._loadTeams());
    }

    private _loadTeams(): void {
        let searchParameters: TeamSearchParameter = cloneDeep(this.searchParameters);

        const userInfo = this._currentUserService.userInfo;
        if (userInfo && userInfo.companyId) {
            searchParameters = { ...searchParameters, companyId: userInfo.companyId };
        }

        this._teamService
            .getTeams(searchParameters)
            .subscribe((result: ISearchResponse<TeamSearchItem>) => {
                this.teams = result.items;
                this.totalCount = result.totalCount;
            });
    }
}
