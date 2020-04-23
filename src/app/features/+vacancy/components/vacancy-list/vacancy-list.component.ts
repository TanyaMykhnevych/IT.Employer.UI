import { Component, Input, OnInit } from '@angular/core';
import { Position, Profession, Technology, Vacancy } from '../../../../models';

@Component({
    selector: 'app-vacancy-list',
    templateUrl: './vacancy-list.component.html',
    styleUrls: ['./vacancy-list.component.scss'],
})

export class VacancyListComponent implements OnInit {
    @Input()
    public set vacancies(vacancies: Vacancy[]) {
        this._vacancies = vacancies;
        if (this._vacancies) {
            this.isLoading = false;
        }
    }
    @Input() public editable: boolean;

    public get vacancies() {
        return this._vacancies;
    }

    public isLoading: boolean = true;
    private _vacancies: Vacancy[] = [];

    constructor() { }

    public ngOnInit(): void { }
}
