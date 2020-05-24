import { Injectable, OnDestroy } from '@angular/core';
import { INavData } from '@coreui/angular';
import { cloneDeep } from 'lodash';
import { Subject } from 'rxjs/';
import { takeUntil } from 'rxjs/operators';
import { CurrentUserService } from '../../../core/permission/services';
import { navItems } from '../_nav';

@Injectable()
export class NavMenuService implements OnDestroy {
    private _navMenu = [];
    private _destroy$: Subject<void> = new Subject<void>();

    constructor(private _currentUserService: CurrentUserService) {
        this._rebuildMenu();
        this._currentUserService.userInfoChanged.pipe(takeUntil(this._destroy$)).subscribe(_ => {
            this._rebuildMenu();
        });
    }

    public ngOnDestroy(): void {
        this._destroy$.next();
        this._destroy$.complete();
    }

    public get navMenu(): INavData[] {
        return this._navMenu;
    }

    private _rebuildMenu(): void {
        let result = cloneDeep(navItems);

        if (this._currentUserService.userInfo && this._currentUserService.userInfo.companyId) {
            const companies = result.filter(i => i.name === 'IT Companies');
            companies[0].children = [companies[0].children[1]];
        }
        if (this._currentUserService.userInfo && this._currentUserService.isAdmin) {
            result = result.filter(i => i.name !== 'My Company' &&
                i.name !== 'My Employees' &&
                i.name !== 'My Offers' &&
                i.name !== 'My Vacancies' &&
                i.name !== 'My Teams');
            const companies = result.filter(i => i.name === 'IT Companies');
            companies[0].children = [companies[0].children[1]];
            const teams = result.filter(i => i.name === 'Teams');
            teams[0].children = [teams[0].children[1]];
            const employees = result.filter(i => i.name === 'Employees');
            employees[0].children = [employees[0].children[1]];
            const vacancies = result.filter(i => i.name === 'Vacancies');
            vacancies[0].children = [vacancies[0].children[1]];
        }
        if (this._currentUserService.userInfo && !this._currentUserService.isAdmin) {
            result = result.filter(i => i.name !== 'Hiring Statistics');
        }

        this._navMenu = result;
    }
}
