
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { SearchRequestParametersUtils } from '../../../core/search/search-request-parameters';
import { SearchResponseUtils } from '../../../core/search/search-response';
import { AppSettings } from '../../../core/settings';
import { ISearchResponse, Vacancy, VacancySearchParameter } from '../../../models';

@Injectable()
export class VacancyService {
    constructor(private _http: HttpClient) { }

    public getVacancies(parameters: VacancySearchParameter): Observable<ISearchResponse<Vacancy>> {

        const params: HttpParams = SearchRequestParametersUtils.getHttpRequestParams<VacancySearchParameter>(parameters);

        return parameters ? this._http.get<ISearchResponse<Vacancy>>(`${AppSettings.apiHost}/vacancy/filter`, { params })
            : of(SearchResponseUtils.getEmptySearchResponse<Vacancy>());
    }

    public getVacancy(vacancyId: number): Observable<Vacancy> {
        return vacancyId ? this._http.get<Vacancy>(`${AppSettings.apiHost}/vacancy/${vacancyId}`) : of(null);
    }

    public create(vacancy: Vacancy): Observable<Vacancy> {
        return this._http.post<Vacancy>(`${AppSettings.apiHost}/vacancy`, vacancy);
    }

    public update(vacancy: Vacancy): Observable<Vacancy> {
        return this._http.put<Vacancy>(`${AppSettings.apiHost}/vacancy`, vacancy);
    }

    public delete(vacancyId: string): Observable<void> {
        return this._http.delete<void>(`${AppSettings.apiHost}/vacancy/${vacancyId}`);
    }

    public get emptyLookupResponse(): ISearchResponse<Vacancy> {
        return {
            items: [],
            totalCount: 0,
        };
    }
}

