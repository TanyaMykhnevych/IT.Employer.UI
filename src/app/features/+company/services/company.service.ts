
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { SearchRequestParametersUtils } from '../../../core/search/search-request-parameters';
import { SearchResponseUtils } from '../../../core/search/search-response';
import { AppSettings } from '../../../core/settings';
import { Company, ISearchResponse } from '../../../models';
import { CompanySearchParameter } from '../../../models/company/company-search-params';
import { tap } from 'rxjs/operators';
import { CurrentUserService } from '../../../core/permission/services';

@Injectable()
export class CompanyService {
    constructor(private _http: HttpClient, private _currentUserService: CurrentUserService) { }

    public getCompanies(parameters: CompanySearchParameter): Observable<ISearchResponse<Company>> {

        const params: HttpParams = SearchRequestParametersUtils.getHttpRequestParams<CompanySearchParameter>(parameters);

        return parameters ? this._http.get<ISearchResponse<Company>>(`${AppSettings.apiHost}/company/filter`, { params })
            : of(SearchResponseUtils.getEmptySearchResponse<Company>());
    }

    public getCompany(companyId: number): Observable<Company> {
        return companyId ? this._http.get<Company>(`${AppSettings.apiHost}/company/${companyId}`) : of(null);
    }

    public create(company: Company): Observable<Company> {
        return this._http.post<Company>(`${AppSettings.apiHost}/company`, company)
            .pipe(tap(comp => this._currentUserService.userCompanyId = comp.id));
    }

    public update(company: Company): Observable<Company> {
        return this._http.put<Company>(`${AppSettings.apiHost}/company`, company);
    }

    public delete(companyId: string): Observable<void> {
        return this._http.delete<void>(`${AppSettings.apiHost}/company/${companyId}`);
    }

    public get emptyLookupResponse(): ISearchResponse<Company> {
        return {
            items: [],
            totalCount: 0,
        };
    }
}

