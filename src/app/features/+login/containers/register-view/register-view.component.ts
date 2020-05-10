import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, RegistrationForm } from '../../../../core/auth';
import { UserService } from '../../services/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-dashboard',
    templateUrl: './register-view.component.html',
    styleUrls: ['./register-view.component.scss'],
})
export class RegisterViewComponent implements OnInit {

    constructor(
        private _auth: AuthService, private _router: Router,
        private _userService: UserService, private _toastr: ToastrService) { }

    public ngOnInit(): void {
        if (this._auth.isAuthenticated()) {
            this._router.navigate(['/']);
        }
    }

    public register(value: RegistrationForm): void {
        this._userService.create(value).subscribe((user) => {
            if (user) {
                this._toastr.success('You are registered successfully');
                this._router.navigate(['/login']);
            }
        });
    }

    public goHome(): void {
        this._router.navigate(['/home']);
    }

    public login(): void {
        this._router.navigate(['/login']);
    }
}
