import { Injectable } from '@angular/core';
import { Team } from '../../../models';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppSettings } from '../../../core/settings';

@Injectable()
export class TeamService {
    constructor(private httpClient: HttpClient) { }

    public create(team: Team): Observable<Team> {
        return this.httpClient.post<Team>(`${AppSettings.apiHost}/team`, team);
    }

    public update(team: Team): Observable<Team> {
        return this.httpClient.put<Team>(`${AppSettings.apiHost}/team`, team);
    }
}
