import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Hire } from '../../../../models/hiring/hire';
import { HttpClient } from '@angular/common/http';
import { AppSettings } from '../../../../core/settings';

@Injectable()
export class HireService {

    constructor(private httpClient: HttpClient) { }

    public getById(id: string): Observable<Hire> {
        return this.httpClient.get<Hire>(`${AppSettings.apiHost}/hire/${id}`);
    }

    public getByCompanyId(companyId: string): Observable<Hire[]> {
        return this.httpClient.get<Hire[]>(`${AppSettings.apiHost}/hire/company/${companyId}`);
    }

    public create(hire: Hire): Observable<string> {
        return this.httpClient.post<string>(`${AppSettings.apiHost}/hire`, hire);
    }

    public approve(id: string): Observable<void> {
        return this.httpClient.put<void>(`${AppSettings.apiHost}/hire/${id}/approve`, {});
    }

    public decline(id: string): Observable<void> {
        return this.httpClient.put<void>(`${AppSettings.apiHost}/hire/${id}/decline`, {});
    }
}
