import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { INavData } from '@coreui/angular';
import { NavMenuService } from '../../services/nav-menu.service';
import { AuthService } from '../../../../core/auth';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html'
})
export class MainComponent implements OnInit {
  public sidebarMinimized = false;
  public isAuthenticated: boolean = false;

  constructor(
    public router: Router,
    private _authService: AuthService,
    private _navMenuService: NavMenuService) { }

  public ngOnInit(): void {
    this.isAuthenticated = this._authService.isAuthenticated();
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
