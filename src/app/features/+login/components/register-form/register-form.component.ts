import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { RegistrationForm } from '../../../../core/auth';


@Component({
    selector: 'app-register-form',
    templateUrl: './register-form.component.html',
    styleUrls: ['./register-form.component.scss'],
})
export class RegisterFormComponent implements OnInit {

    @Output() public submit: EventEmitter<RegistrationForm> = new EventEmitter<RegistrationForm>();

    public form: FormGroup;
    public submitted: boolean = false;

    constructor(private _builder: FormBuilder,
        private _translateService: TranslateService,
    ) { }

    public ngOnInit(): void {
        this.form = this._builder.group({
            username: new FormControl('', [Validators.required]),
            password: new FormControl('', [Validators.required]),
            confirmPassword: new FormControl('', [Validators.required]),
        });

        this.form.valueChanges.subscribe((value: RegistrationForm) => {
            if (value.password !== value.confirmPassword) {
                this.form.controls.password.setErrors({ notMatch: true });
                this.form.controls.confirmPassword.setErrors({ notMatch: true });
            } else {
                this.form.controls.password.setErrors(null);
                this.form.controls.confirmPassword.setErrors(null);
            }
        });
    }

    public onSubmit(e: Event): void {
        e.preventDefault();
        e.stopPropagation();
        this.submitted = true;
        if (this.form.invalid) { return; }
        this.submit.emit(this.form.value);
    }

    public getErrorMessage(): string {
        if (this.form.controls.password.hasError('notMatch') && this.form.controls.confirmPassword.hasError('notMatch')) {
            return this._translateService.instant('errors.passwords_not_match');
        } else {
            this.form.controls.password.setErrors(null);
            this.form.controls.confirmPassword.setErrors(null);
        }
    }
}
