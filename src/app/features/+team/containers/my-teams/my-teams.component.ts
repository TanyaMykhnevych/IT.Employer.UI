import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { cloneDeep } from 'lodash';
import { AbstractSearchListView } from '../../../../core/search';
import { ISearchResponse, TeamSearchItem, TeamSearchParameter } from '../../../../models';
import { TeamService } from '../../services/team.service';

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
        private _teamService: TeamService) {
        super();
    }

    public loadData(): void {
        this._loadTeams();
    }

    private _loadTeams(): void {
        const searchParameters: TeamSearchParameter = cloneDeep(this.searchParameters);

        searchParameters.myTeams = true;
        this._teamService
            .getTeams(searchParameters)
            .subscribe((result: ISearchResponse<TeamSearchItem>) => {
                this.teams = result.items;
                this.totalCount = result.totalCount;
            });
    }
}
