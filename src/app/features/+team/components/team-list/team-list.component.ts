import { Component, Input, OnInit } from '@angular/core';
import { Team, TeamSearchItem } from '../../../../models';

@Component({
    selector: 'app-team-list',
    templateUrl: './team-list.component.html',
    styleUrls: ['./team-list.component.scss'],
})

export class TeamListComponent implements OnInit {
    @Input()
    public set teams(teams: TeamSearchItem[]) {
        this._teams = teams;
        if (this._teams) {
            this.isLoading = false;
        }
    }
    @Input() public editable: boolean;

    public get teams() {
        return this._teams;
    }

    public isLoading: boolean = true;
    private _teams: TeamSearchItem[] = [];

    constructor() { }

    public ngOnInit(): void { }
}
