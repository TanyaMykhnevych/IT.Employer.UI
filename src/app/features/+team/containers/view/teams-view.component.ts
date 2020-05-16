import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { cloneDeep } from 'lodash';
import { AbstractSearchListView } from '../../../../core/search/abstract-search-list-view';
import { ISearchResponse, TeamSearchParameter, TeamSearchItem } from '../../../../models';
import { TeamService } from '../../services/team.service';


@Component({
    selector: 'app-teams-view',
    templateUrl: './teams-view.component.html',
})
export class TeamsViewComponent extends AbstractSearchListView<TeamSearchParameter> {
    public teams: TeamSearchItem[];
    public totalCount: number;

    constructor(
        private _teamService: TeamService,
        protected router: Router,
        protected route: ActivatedRoute) {
        super();
    }

    public reloadTeams(): void {
        this.loadData();
    }

    public onSearch(searchParameters: TeamSearchParameter): void {
        super.onSearch(searchParameters);
    }

    protected loadData(): void {
        const searchParameters: TeamSearchParameter = cloneDeep(this.searchParameters);
        this._teamService
            .getTeams(searchParameters)
            .subscribe((result: ISearchResponse<TeamSearchItem>) => {
                this.teams = result.items;
                this.totalCount = result.totalCount;
            });
    }
}
