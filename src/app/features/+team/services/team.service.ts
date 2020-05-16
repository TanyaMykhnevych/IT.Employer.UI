import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { SearchRequestParametersUtils, SearchResponseUtils } from '../../../core/search';
import { AppSettings } from '../../../core/settings';
import { ISearchResponse, Team, TeamSearchParameter, TeamSearchItem } from '../../../models';

@Injectable()
export class TeamService {
    constructor(private httpClient: HttpClient) { }

    public getTeams(parameters: TeamSearchParameter): Observable<ISearchResponse<TeamSearchItem>> {
        const params: HttpParams = SearchRequestParametersUtils.getHttpRequestParams<TeamSearchParameter>(parameters);

        return parameters ? this.httpClient.get<ISearchResponse<TeamSearchItem>>(`${AppSettings.apiHost}/team/filter`, { params })
            : of(SearchResponseUtils.getEmptySearchResponse<TeamSearchItem>());
    }

    public create(team: Team): Observable<Team> {
        return this.httpClient.post<Team>(`${AppSettings.apiHost}/team`, team);
    }

    public update(team: Team): Observable<Team> {
        return this.httpClient.put<Team>(`${AppSettings.apiHost}/team`, team);
    }
}
