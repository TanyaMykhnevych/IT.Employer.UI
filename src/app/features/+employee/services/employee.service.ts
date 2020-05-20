
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { SearchRequestParametersUtils } from '../../../core/search/search-request-parameters';
import { SearchResponseUtils } from '../../../core/search/search-response';
import { AppSettings } from '../../../core/settings';
import { Employee, EmployeeSearchParameter, ISearchResponse } from '../../../models';

@Injectable()
export class EmployeeService {
    constructor(private _http: HttpClient) { }

    public getEmployees(parameters: EmployeeSearchParameter): Observable<ISearchResponse<Employee>> {

        const params: HttpParams = SearchRequestParametersUtils.getHttpRequestParams<EmployeeSearchParameter>(parameters);

        return parameters ? this._http.get<ISearchResponse<Employee>>(`${AppSettings.apiHost}/employee/filter`, { params })
            : of(SearchResponseUtils.getEmptySearchResponse<Employee>());
    }

    public getActiveSeparateEmployees(parameters: EmployeeSearchParameter): Observable<ISearchResponse<Employee>> {

        const params: HttpParams = SearchRequestParametersUtils.getHttpRequestParams<EmployeeSearchParameter>(parameters);

        return parameters ? this._http.get<ISearchResponse<Employee>>(`${AppSettings.apiHost}/employee/filter/active/single`, { params })
            : of(SearchResponseUtils.getEmptySearchResponse<Employee>());
    }

    public getEmployee(employeeId: number): Observable<Employee> {
        return employeeId ? this._http.get<Employee>(`${AppSettings.apiHost}/employee/${employeeId}`) : of(null);
    }

    public create(employee: Employee): Observable<Employee> {
        return this._http.post<Employee>(`${AppSettings.apiHost}/employee`, employee);
    }

    public update(employee: Employee): Observable<Employee> {
        return this._http.put<Employee>(`${AppSettings.apiHost}/employee`, employee);
    }

    public delete(employeeId: string): Observable<void> {
        return this._http.delete<void>(`${AppSettings.apiHost}/employee/${employeeId}`);
    }

    public get emptyLookupResponse(): ISearchResponse<Employee> {
        return {
            items: [],
            totalCount: 0,
        };
    }
}

