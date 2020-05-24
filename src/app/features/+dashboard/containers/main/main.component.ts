import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { INavData } from '@coreui/angular';
import { NavMenuService } from '../../services/nav-menu.service';
import { AuthService, IUserInfo } from '../../../../core/auth';
import { CurrentUserService } from '../../../../core/permission/services';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['main.component.scss']
})
export class MainComponent implements OnInit {
  public sidebarMinimized = false;
  public isAuthenticated: boolean = false;
  public userInfo: IUserInfo;

  constructor(
    public router: Router,
    private _authService: AuthService,
    private _navMenuService: NavMenuService,
    private _currentUserService: CurrentUserService) { }

  public ngOnInit(): void {
    this.isAuthenticated = this._authService.isAuthenticated();
    this.userInfo = this._currentUserService.userInfo;
    this._currentUserService.userInfoChanged.subscribe(_ => this.userInfo = this._currentUserService.userInfo);
  }

  public get navItems(): INavData[] {
    return this._navMenuService.navMenu;

  }

  public toggleMinimize(e): void {
    this.sidebarMinimized = e;
  }

  public logout(): void {
    this._authService.unauthorize();
    this.router.navigate(['/home']);
  }
}
