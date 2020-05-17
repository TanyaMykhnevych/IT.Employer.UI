import { Component, Input, OnInit } from '@angular/core';
import { PositionOptionDescriptions } from '../../../../core/constants/positions-option-descriptions.const';
import { ProfessionOptionDescriptions } from '../../../../core/constants/profession-option-descriptions.const';
import { TechnologyOptionDescriptions } from '../../../../core/constants/technology-option-descriptions.const';
import { Position, Profession, Technology, Vacancy } from '../../../../models';

@Component({
    selector: 'app-vacancy-list-item',
    templateUrl: './vacancy-list-item.component.html',
    styleUrls: ['./vacancy-list-item.component.scss'],
})

export class VacancyListItemComponent implements OnInit {
    @Input() public vacancy: Vacancy;
    @Input() public editable: boolean;

    constructor() { }

    public ngOnInit(): void { }

    public getProfession(profession: Profession): string {
        return ProfessionOptionDescriptions.find(p => p.key === profession).value;
    }

    public getPosition(position: Position): string {
        return PositionOptionDescriptions.find(p => p.key === position).value;
    }

    public getTechnology(technology: Technology): string {
        return TechnologyOptionDescriptions.find(p => p.key === technology).value;
    }
}
