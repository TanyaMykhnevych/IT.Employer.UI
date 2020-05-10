import { Injectable } from '@angular/core';
import { INavData } from '@coreui/angular';
import { cloneDeep } from 'lodash';
import { CurrentUserService } from '../../../core/permission/services';
import { navItems } from '../_nav';

@Injectable()
export class NavMenuService {
    private _navMenu  = [];

    constructor(private _currentUserService: CurrentUserService) {
        this._rebuildMenu();
        this._currentUserService.userInfoChanged.subscribe(_ => {
            this._rebuildMenu();
        });
    }

    public get navMenu(): INavData[] {
        return this._navMenu;
    }

    private _rebuildMenu(): void {
        const result = cloneDeep(navItems);

        if (this._currentUserService.userInfo && this._currentUserService.userInfo.companyId) {
            const companies = result.filter(i => i.name === 'IT Companies');
            companies[0].children = [companies[0].children[1]];
        }

        this._navMenu = result;
    }
}
