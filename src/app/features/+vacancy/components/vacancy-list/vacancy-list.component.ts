import { Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Position, Profession, Technology, Vacancy } from '../../../../models';

@Component({
    selector: 'app-vacancy-list',
    templateUrl: './vacancy-list.component.html',
    styleUrls: ['./vacancy-list.component.scss'],
})

export class VacancyListComponent implements OnInit {
    public Profession = Profession;
    public Position = Position;
    public Technology = Technology;

    @Input()
    public set vacancies(vacancies: Vacancy[]) {
        this._vacancies = vacancies;
        if (this._vacancies) {
            this.dataSource = new MatTableDataSource(this._vacancies);
            this.isLoading = false;
        }
    }

    public get vacancies() {
        return this._vacancies;
    }

    public dataSource: MatTableDataSource<Vacancy>;
    public displayedColumns = ['name', 'createdOn'];
    public isLoading: boolean = true;
    private _vacancies: Vacancy[] = [];

    constructor() { }

    public ngOnInit(): void { }
}
