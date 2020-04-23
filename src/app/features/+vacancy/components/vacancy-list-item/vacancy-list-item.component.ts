import { Component, Input, OnInit } from '@angular/core';
import { Position, Profession, Technology, Vacancy } from '../../../../models';

@Component({
    selector: 'app-vacancy-list-item',
    templateUrl: './vacancy-list-item.component.html',
    styleUrls: ['./vacancy-list-item.component.scss'],
})

export class VacancyListItemComponent implements OnInit {
    @Input() public vacancy: Vacancy;
    @Input() public editable: boolean;
    public Profession = Profession;
    public Position = Position;
    public Technology = Technology;

    constructor() { }

    public ngOnInit(): void { }
}
