import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { cloneDeep } from 'lodash';
import { AbstractSearchListView } from '../../../../core/search/abstract-search-list-view';
import { ISearchResponse, Vacancy, VacancySearchParameter } from '../../../../models';
import { VacancyService } from '../../services/vacancy.service';


@Component({
    selector: 'app-my-vacancies',
    templateUrl: './my-vacancies.component.html',
})
export class MyVacanciesComponent extends AbstractSearchListView<VacancySearchParameter> {
    public vacancies: Vacancy[];
    public totalCount: number;

    constructor(
        private _vacancyService: VacancyService,
        protected router: Router,
        protected route: ActivatedRoute) {
        super();
    }

    public reloadVacancies(): void {
        this.loadData();
    }

    public onSearch(searchParameters: VacancySearchParameter): void {
        super.onSearch(searchParameters);
    }

    protected loadData(): void {
        const searchParameters: VacancySearchParameter = cloneDeep(this.searchParameters);
        searchParameters.myVacancies = true;
        this._vacancyService
            .getVacancies(searchParameters)
            .subscribe((result: ISearchResponse<Vacancy>) => {
                this.vacancies = result.items;
                this.totalCount = result.totalCount;
            });
    }
}
