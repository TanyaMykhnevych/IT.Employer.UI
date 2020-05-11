import { Injectable } from '@angular/core';
import { Observable, of, ReplaySubject } from 'rxjs';
import { IUserInfo } from '../models/user-info';
import { HttpClient } from '@angular/common/http';
import { CurrentUserService } from '../../permission/services';
import { AppSettings } from '../../settings';
import { AuthService } from './auth.service';

@Injectable()
export class UserInfoService {

    constructor(
        private httpClient: HttpClient,
        private authService: AuthService,
        private currentUserService: CurrentUserService) { }

    public loadUserInfo(): Observable<IUserInfo> {
        if (!this.authService.isAuthenticated()) {
            return of(null);
        }

        const loadSubject = new ReplaySubject<IUserInfo>(1);

        this.httpClient.get(`${AppSettings.apiHost}/auth/user-info`)
            .subscribe(userInfo => {
                this.currentUserService.userInfo = userInfo;
                loadSubject.next(userInfo);
                loadSubject.complete();
            });

        return loadSubject.asObservable();
    }
}
