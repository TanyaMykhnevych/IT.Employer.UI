import { Component, Input, OnInit } from '@angular/core';
import { TeamSearchItem, Technology } from '../../../../models';
import { TechnologyOptionDescriptions } from '../../../../core/constants/technology-option-descriptions.const';

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

    public getTechnologies(technologies: Technology[]): string {
        let result = '';
        technologies.forEach(t => {
            result += ` ${TechnologyOptionDescriptions.find(d => d.key === t).value},`;
        });

        result = result.trim();

        return result.substring(0, result.length - 1);
    }
}
