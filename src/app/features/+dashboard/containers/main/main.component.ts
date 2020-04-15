import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/auth';
import { navItems } from '../../../../_nav';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html'
})
export class MainComponent implements OnInit {
  public sidebarMinimized = false;
  public navItems = navItems;
  public isAuthenticated: boolean = false;

  constructor(
    public router: Router,
    private _authService: AuthService) { }

  public ngOnInit(): void {
    this.isAuthenticated = this._authService.isAuthenticated();
  }

  public toggleMinimize(e): void {
    this.sidebarMinimized = e;
  }

  public logout(): void {
    this._authService.unauthorize();
    this.router.navigate(['/home']);
  }
}
