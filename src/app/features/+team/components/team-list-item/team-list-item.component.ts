import { Component, Input, OnInit } from '@angular/core';
import { TeamSearchItem } from '../../../../models';

@Component({
    selector: 'app-team-list-item',
    templateUrl: './team-list-item.component.html',
    styleUrls: ['./team-list-item.component.scss'],
})

export class TeamListItemComponent implements OnInit {
    @Input() public team: TeamSearchItem;
    @Input() public editable: boolean;

    constructor() { }

    public ngOnInit(): void { }
}
