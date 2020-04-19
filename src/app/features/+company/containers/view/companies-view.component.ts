import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { cloneDeep } from 'lodash';
import { AbstractSearchListView } from '../../../../core/search/abstract-search-list-view';
import { Company, CompanySearchParameter, ISearchResponse } from '../../../../models';
import { CompanyService } from '../../services/company.service';


@Component({
    selector: 'app-companies-view',
    templateUrl: './companies-view.component.html',
    styleUrls: ['./companies-view.component.scss'],
})
export class CompaniesViewComponent extends AbstractSearchListView<CompanySearchParameter> {
    public companies: Company[];
    public totalCount: number;
    public selectedCompanies: Company[] = [];

    constructor(
        private _companyService: CompanyService,
        protected router: Router,
        protected route: ActivatedRoute) {
        super();
    }

    public reloadCompanies(): void {
        this.loadData();
    }

    public onSearch(searchParameters: CompanySearchParameter): void {
        super.onSearch(searchParameters);
    }

    public updateSelectedCompanies(companies: Company[]): void {
        this.selectedCompanies = companies;
    }

    protected loadData(): void {
        const searchParameters: CompanySearchParameter = cloneDeep(this.searchParameters);
        this._companyService
            .getCompanies(searchParameters)
            .subscribe((result: ISearchResponse<Company>) => {
                this.companies = result.items;
                this.totalCount = result.totalCount;
            });
    }
}
