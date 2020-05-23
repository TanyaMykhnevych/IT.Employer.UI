import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from '../../core/core.module';
import { MaterialModule } from '../../layout/material.module';
import { ChatComponent } from './containers/chat.component';
import { ChatRoutingModule } from './routes/chat-routing.module';


@NgModule({
    imports: [
        CommonModule,
        MaterialModule,
        ChatRoutingModule,
        CoreModule,
        ReactiveFormsModule,
        FormsModule,
    ],
    declarations: [
        ChatComponent,
    ],
    entryComponents: [
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ChatModule {
    public static forRoot(): ModuleWithProviders {
        return {
            ngModule: ChatModule,
            providers: [],
        };
    }
}
