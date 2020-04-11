import { NgModule } from '@angular/core';
import { AuthModule } from './auth';
const MODULES = [
    AuthModule.forRoot(),
];

const DIRECTIVES = [];

@NgModule({
    imports: [
        ...MODULES,
    ],
    exports: [
        ...DIRECTIVES,
    ],
    declarations: [
        ...DIRECTIVES,
    ],
})
export class CoreModule { }
