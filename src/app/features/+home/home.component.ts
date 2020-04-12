import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth';

@Component({
  selector: 'app-dashboard',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  constructor(
    public router: Router,
    private _authService: AuthService,
  ) { }

  public get isAuthenticated(): boolean {
    return this._authService.isAuthenticated();
  }
}
