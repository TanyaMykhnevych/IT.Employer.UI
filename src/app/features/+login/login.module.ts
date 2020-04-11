import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginRoutingModule } from './routes/login-routing.module';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        LoginRoutingModule,
    ],
    declarations: [
    ],
})
export class LoginModule {
    public static forRoot(): ModuleWithProviders {
        return {
            ngModule: LoginModule,
            providers: [],
        };
    }
}
